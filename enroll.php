<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // === Collect and sanitize form fields ===
    $first       = trim($_POST['first_name'] ?? '');
    $last        = trim($_POST['last_name'] ?? '');
    $phone       = trim($_POST['phone'] ?? '');
    $email       = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $address     = trim($_POST['address'] ?? '');
    $country     = trim($_POST['country'] ?? '');
    $dob         = trim($_POST['dob'] ?? '');
    $education   = trim($_POST['education'] ?? '');
    $program     = trim($_POST['program'] ?? '');
    $esign       = trim($_POST['esign'] ?? '');
    $esign_date  = trim($_POST['esign_date'] ?? '');
    $crimes      = $_POST['crim'] ?? [];

    $errors = [];

    // === Validate required fields ===
    $required = [
        'first' => $first, 'last' => $last, 'phone' => $phone, 'email' => $email,
        'address' => $address, 'country' => $country, 'dob' => $dob,
        'education' => $education, 'program' => $program,
        'esign' => $esign, 'esign_date' => $esign_date
    ];

    foreach ($required as $key => $value) {
        if (empty($value)) {
            $errors[] = ucfirst(str_replace('_', ' ', $key)) . " is required.";
        }
    }

    if (!$email) {
        $errors[] = "Valid email is required.";
    }

    // === Handle file uploads ===
    $files = ['photo', 'diploma', 'id_card', 'birth_cert'];
    $uploaded_paths = [];
    $upload_dir = __DIR__ . '/uploads/';

    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    foreach ($files as $file) {
        if (isset($_FILES[$file]) && $_FILES[$file]['error'] === UPLOAD_ERR_OK) {
            $tmp = $_FILES[$file]['tmp_name'];
            $name = basename($_FILES[$file]['name']);
            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            $allowed = ['jpg', 'jpeg', 'png', 'pdf'];

            if (!in_array($ext, $allowed)) {
                $errors[] = "Invalid file type for {$file}. Allowed: " . implode(', ', $allowed);
                continue;
            }

            if ($_FILES[$file]['size'] > 5 * 1024 * 1024) {
                $errors[] = ucfirst($file) . " exceeds 5MB size limit.";
                continue;
            }

            $new_name = time() . "_" . uniqid() . ".$ext";
            $destination = $upload_dir . $new_name;

            if (move_uploaded_file($tmp, $destination)) {
                $uploaded_paths[$file] = $destination;
            } else {
                $errors[] = "Failed uploading {$file}.";
            }
        } else {
            $errors[] = ucfirst(str_replace('_', ' ', $file)) . " is required.";
        }
    }

    // === If there are errors, show them ===
    if (!empty($errors)) {
        echo "<h2>Errors:</h2><ul>";
        foreach ($errors as $e) {
            echo "<li>" . htmlspecialchars($e) . "</li>";
        }
        echo "</ul><p><a href='enrollment.html'>Go back</a></p>";
        exit;
    }

    // === Prepare email ===
    $to = 'abdel09b@gmail.com';  // Change to your email
    $subject = "New Enrollment - {$first} {$last}";

    $message = "Name: $first $last
Phone: $phone
Email: $email
Address: $address
Country: $country
DOB: $dob
Education (year): $education
Program: $program
E-signature: $esign
E-sign date: $esign_date
Criminal record: " . implode(', ', $crimes) . "

Uploaded files:
";

    foreach ($uploaded_paths as $label => $path) {
        $message .= ucfirst(str_replace('_', ' ', $label)) . ": http://{$_SERVER['HTTP_HOST']}/uploads/" . basename($path) . "\n";
    }

    $headers = "From: abdel09b@gmail.com\r\n";

    mail($to, $subject, $message, $headers);

    // === Redirect to thank-you page ===
    header('Location: enrollment-success.html');
    exit;
}
?>
