<?php

include 'database.php';

$id = $_POST['id'];

$query = "SELECT * FROM task WHERE id = $id";
$result = mysqli_query($connection, $query);
if(!$result){
  die('Query Error' . mysqli_error($connection));
}
else

  $json = array();
  while($row = mysqli_fetch_array($result)){
    $json[] = array(
      'id' => $row['id'],
      'name' => $row['name'],
      'description' => $row['description'],
    );
  };

  $jsonString = json_encode($json);
  echo $jsonString;
?>