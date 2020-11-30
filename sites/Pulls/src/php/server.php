<?php
require './PHPMailer.php';
require './SMTP.php';
require './Exception.php';
$name = $_POST['name'];
$post = $_POST['mail'];
$tel = $_POST['tel'];

// Формирование самого письма
$title = "Новый заказ";
$body = "
<h2>Новое письмо</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $post<br><br>
<b>телефон:</b><br>$tel
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'richhills.sl@gmail.com'; // Логин на почте
    $mail->Password   = 'prfgmm822'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('richhills.sl@gmail.com', 'Yaroslav'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('malofiy.sl@gmail.com'); 
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error"; 
    $status = "Сообщение не было отправлено. Причина ошибки:";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo $result;
