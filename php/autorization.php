

<?php
///обработка post запроса и поиск пользователя в базе данных

$parole = isset($_POST["parole"]) ? $_POST["parole"] : "NO parole";
$login = isset($_POST["login"]) ? $_POST["login"] : "NO login";

$db = new SQLite3('my_db.db'); 
 
$sql="SELECT name, family, login FROM user WHERE login='$login' AND parole='$parole' ";

try {
    $result=$db->query($sql); 
    echo json_encode($row=$result->fetchArray());	
} catch (Exception $e) {	
    echo json_encode($e);
}

?>