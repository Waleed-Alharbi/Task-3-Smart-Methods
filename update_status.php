<?php
require "db.php";
$conn->query("UPDATE poses SET status = 0");
?>
