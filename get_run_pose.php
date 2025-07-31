<?php
require "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $conn->prepare("INSERT INTO poses (motor1, motor2, motor3, motor4, motor5, motor6) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iiiiii", $_POST['motor1'], $_POST['motor2'], $_POST['motor3'], $_POST['motor4'], $_POST['motor5'], $_POST['motor6']);
    $stmt->execute();
    exit;
}

if (isset($_GET['delete']) && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $conn->query("DELETE FROM poses WHERE id=$id");
    exit;
}

$result = $conn->query("SELECT * FROM poses");
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
?>
