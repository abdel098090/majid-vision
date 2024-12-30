<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $userInput = $data["message"];

    $apiKey = "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"; // Replace with your OpenAI API key
    $apiUrl = "https://api.openai.com/v1/chat/completions";

    $postData = json_encode([
        "model" => "gpt-3.5-turbo",
        "messages" => [["role" => "user", "content" => $userInput]],
    ]);

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey",
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
}
?>
