

<?php
///обработка post запроса и сохранение пользователя в базе данных
$name = isset($_POST["name"]) ? $_POST["name"] : "NO NAME";
$family = isset($_POST["family"]) ? $_POST["family"] : "NO family";
$parole = isset($_POST["parole"]) ? $_POST["parole"] : "NO parole";
$login = isset($_POST["login"]) ? $_POST["login"] : "NO login";

$db = new SQLite3('my_db.db'); 

$sql="CREATE TABLE IF NOT EXISTS
		user(id integer primary key, 
                      name text, 
                      family text, 
                      login  text unique, 
                      parole text 
                      )";
$db->exec($sql);

$sql="INSERT INTO `user` 
   (`name`, `family`, `login`, `parole`) VALUES
   ('$name', '$family', '$login', '$parole')";

$user = array("login"=>$login, "error"=>0);

try {
	$db->exec($sql); 
    echo json_encode($user);  
} catch (Exception $e) {
 
   echo json_encode($e);///////////////---------------
}
?>