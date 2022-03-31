<?php
// Initialize the session
session_start();
 

 
// Include config file
require_once "config.php";

$badgeCode = "";

if($_SERVER["REQUEST_METHOD"] == "POST"){

    if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] === false){
        header("location: ../index.php");
        exit;
    }

    $badgeCode = trim($_POST["badgeCode"]);

    switch($badgeCode){
        case "GSEA":
            $_SESSION["badge1"] = 1;
            $sql = "UPDATE users SET badge1 = 1 WHERE username = ?";
            $stmt = mysqli_prepare($link, $sql);
            mysqli_stmt_bind_param($stmt, "s", $_SESSION["username"]);
            
            $result = mysqli_stmt_execute($stmt);
            if(!empty($result)) {
                echo "<h3><center>User information Updated successfully</center></h3>";
            } else {
          
            }
            break;
        case "GSEDS":
            $_SESSION["badge2"] = 1;
            $sql = "UPDATE users SET badge2 = 1 WHERE username = ?";
            $stmt = mysqli_prepare($link, $sql);
            mysqli_stmt_bind_param($stmt, "s", $_SESSION["username"]);
            
            $result = mysqli_stmt_execute($stmt);
            if(!empty($result)) {
                echo "<h3><center>User information Updated successfully</center></h3>";
            } else {
          
            }
            break;
        case "GSTEH":
            $_SESSION["badge3"] = 1;
            $sql = "UPDATE users SET badge3 = 1 WHERE username = ?";
            $stmt = mysqli_prepare($link, $sql);
            mysqli_stmt_bind_param($stmt, "s", $_SESSION["username"]);
            
            $result = mysqli_stmt_execute($stmt);
            if(!empty($result)) {
                echo "<h3><center>User information Updated successfully</center></h3>";
            } else {
          
            }
            break;
        case "GSCE":
            $_SESSION["badge4"] = 1;
            $sql = "UPDATE users SET badge4 = 1 WHERE username = ?";
            $stmt = mysqli_prepare($link, $sql);
            mysqli_stmt_bind_param($stmt, "s", $_SESSION["username"]);
            
            $result = mysqli_stmt_execute($stmt);
            if(!empty($result)) {
                echo "<h3><center>User information Updated successfully</center></h3>";
            } else {
          
            }
            break;
        case "IHTRAI":
            $_SESSION["badge5"] = 1;
            $sql = "UPDATE users SET badge5 = 1 WHERE username = ?";
            $stmt = mysqli_prepare($link, $sql);
            mysqli_stmt_bind_param($stmt, "s", $_SESSION["username"]);
            
            $result = mysqli_stmt_execute($stmt);
            if(!empty($result)) {
                echo "<h3><center>User information Updated successfully</center></h3>";
            } else {
          
            }
            break;
        case "IHTRDADS":
            $_SESSION["badge6"] = 1;
            $sql = "UPDATE users SET badge6 = 1 WHERE username = ?";
            $stmt = mysqli_prepare($link, $sql);
            mysqli_stmt_bind_param($stmt, "s", $_SESSION["username"]);
            
            $result = mysqli_stmt_execute($stmt);
            if(!empty($result)) {
                echo "<h3><center>User information Updated successfully</center></h3>";
            } else {
          
            }
            break;
        case "IHTRCC":
            $_SESSION["badge7"] = 1;
            $sql = "UPDATE users SET badge7 = 1 WHERE username = ?";
            $stmt = mysqli_prepare($link, $sql);
            mysqli_stmt_bind_param($stmt, "s", $_SESSION["username"]);
            
            $result = mysqli_stmt_execute($stmt);
            if(!empty($result)) {
                echo "<h3><center>User information Updated successfully</center></h3>";
            } else {
          
            }
            break;
        case "JCEYS":
            $_SESSION["badge8"] = 1;
            $sql = "UPDATE users SET badge8 = 1 WHERE username = ?";
            $stmt = mysqli_prepare($link, $sql);
            mysqli_stmt_bind_param($stmt, "s", $_SESSION["username"]);
            
            $result = mysqli_stmt_execute($stmt);
            if(!empty($result)) {
                echo "<h3><center>User information Updated successfully</center></h3>";
            } else {
          
            }
            break;
        default:
            break;
    }
}




header("location: ../index.php");
?>