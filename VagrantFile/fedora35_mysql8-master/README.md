#Description
This project contains a simple fedora-35 x64 based VM which as part of provisioning will:
1) install MySQL 8 from Oracle's yum repo
2) Configure the security so that the mysql root user's password is 'vagrant'
3) Forward the port 33061 on the host machine into the 3306 on the guest VM, so you can connect to the server from your main computer via 127.0.0.1:33061

