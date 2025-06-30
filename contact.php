<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $message = trim($_POST["message"]);
  $recaptcha = $_POST['g-recaptcha-response'];

  // ✅ Replace this with your actual secret key
  $secretKey = "6LdjgHArAAAAAK5ybxrX__Y976qSjVfyzBOWxV0P";

  // 🔒 Verify reCAPTCHA
  $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$recaptcha");
  $captcha = json_decode($response);

  if ($captcha->success) {
    // ✅ reCAPTCHA successful
    if (!empty($name) && filter_var($email, FILTER_VALIDATE_EMAIL) && !empty($message)) {
      $to = "loginhere88@gmail.com"; // 🔁 Your email here
      $subject = "New Contact Message from $name";
      $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
      $headers = "From: $email";

      if (mail($to, $subject, $body, $headers)) {
        echo "Thank you! Your message has been sent.";
      } else {
        echo "Oops! Something went wrong.";
      }
    } else {
      echo "Please complete the form correctly.";
    }
  } else {
    echo "reCAPTCHA failed. Please try again.";
  }
} else {
  echo "Invalid request.";
}
?>
