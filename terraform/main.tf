resource "null_resource" "connSetUp" {
    provisioner "remote-exec" {
        connection {
          host = var.server_ip
          user = var.server_user
          port = 22210
          private_key = file("/home/paris/.ssh/id_rsa")
        }
        inline = [ 
          "echo 'Успешное подключение!'",
          "echo ${var.server_pass} | sudo -S apt update",
          "sudo apt-get install -y ca-certificates curl gnupg lsb-release",
          "sudo mkdir -p /etc/apt/keyrings",
          "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null",
          "echo \"deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null",
          "sudo apt update",
          "sudo apt-get install -y docker-ce docker-ce-cli containerd.io",
          "echo ${var.server_pass} | sudo -S usermod -aG docker $USER",
          "newgrp docker",


          "curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64",
          "sudo install minikube-linux-amd64 /usr/local/bin/minikube",
          "minikube start --driver=docker"
          
        ]
    }
}