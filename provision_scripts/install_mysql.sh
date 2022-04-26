#!/bin/bash


echo "Installing Oracle MySQL package repo"
sudo dnf -y install https://dev.mysql.com/get/mysql80-community-release-fc35-2.noarch.rpm

echo "Installing MySQL 8 Community Server"
sudo dnf -y install mysql-community-server

echo "Enabling and starting mysql server"
sudo systemctl start mysqld.service
sudo systemctl enable mysqld.service

echo "Installing Javascript and React"
sudo dnf install npm
npm install react@17

#For rationale for below, see https://bertvv.github.io/notes-to-self/2015/11/16/automating-mysql_secure_installation/
#	Note several changes were made by me to allow setting the password to vagrant

echo "Cleaning up security and setting root password to vagrant"
export MYSQLPASS=`sudo grep 'A temporary password' /var/log/mysqld.log |tail - | awk '{print $13}'`

mysql --connect-expired-password --user=root -p$MYSQLPASS <<_EOF_
set password = 'Vagrant123$';
SET GLOBAL validate_password.policy=LOW;
FLUSH PRIVILEGES;
_EOF_

mysql --connect-expired-password --user=root -pVagrant123\$ <<_EOF_
SET GLOBAL validate_password.policy=LOW;
SET GLOBAL validate_password.length=7;
set password = 'vagrant';
DELETE FROM mysql.user WHERE User='';
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';
FLUSH PRIVILEGES;
_EOF_

echo "Finished configuring MySQL"

