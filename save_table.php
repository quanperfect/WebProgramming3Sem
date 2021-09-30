  <?php

session_start();

//Example #1 Timing script execution
$time_start = microtime(true);

date_default_timezone_set("Europe/Moscow");
$current_time = date("d M Y H:i:s");

$r = floatval(htmlspecialchars($_POST["r"]));
$x = floatval(htmlspecialchars($_POST["x"]));
$y = floatval(htmlspecialchars($_POST["y"]));

$message = "Error";
$result_t = "Нет";

if (($x == 0 && $y >= -$r && $y <= $r) || ($x < 0 && $y >= 0 && $x <= $r && $y <= $r) || ($x > 0 && $y >= 0 && ($y <= (-$x/2 + 0.5*$r))) || ($x >= 0 && $y <= 0 && (($r*$r) >= ($x*$x + $y*$y))))
{
  $message = "Да";
  $result_t = "Да";
}
else {
  $message = "Нет";
}



$time_end = microtime(true);
$exectime = $time_end - $time_start;
$exectime = strval(number_format($exectime, 10, ".", "")*1000) . ' ms';

// Сохранение в сессию
$result = array($x, $y, $r, $message, $exectime, $current_time);
if (!isset($_SESSION['results']))
{
  $_SESSION['results'] = array();
}
array_push($_SESSION['results'], $result);

print_r('<tr><td>'.$x.'</td><td>'.$y.'</td><td>'.$r.'</td><td>'.$message.'</td><td>'.$exectime.'</td><td>'.$current_time.'</td></tr>');

?>
