<?php

session_start();
$myData = array(($_SESSION["badge1"]),($_SESSION["badge2"]),($_SESSION["badge3"]),($_SESSION["badge4"]),($_SESSION["badge5"]),($_SESSION["badge6"]),($_SESSION["badge7"]),($_SESSION["badge8"]));
echo json_encode($myData);

?>