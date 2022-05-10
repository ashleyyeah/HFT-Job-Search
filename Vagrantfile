# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox"
  #config.vm.box = "fin566_ss_base"
  #config.ssh.password = "vagrant"

  config.vm.box = "generic/fedora35"

  config.ssh.insert_key = false
  config.vm.synced_folder ".", "/vagrant", disabled: false

  
  config.vm.define "mysql" do |mysql|
    mysql.vm.hostname = "mysql"
    
    mysql.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--memory", "2048"]
      vb.customize ["modifyvm", :id, "--cpus", "2"]
    end
  
    #tcp1.vm.network "private_network", ip: "192.168.50.101", virtualbox__intnet: "tcp_network", nic_type: "virtio"
    
    #forward the port that MySQL listens on inside the VM to the local host of 33061 so that on your main machine
    #you can connect to 127.0.0.1:33061 to connect to MySQL running inside this VM
    mysql.vm.network "forwarded_port", guest: 3306, host: 33061
    # mysql.vm.network "forwarded_port", guest: 3000, host: 3000
    # mysql.vm.network "forwarded_port", guest: 5001, host: 5000

    mysql.vm.provision "shell", path: "provision_scripts/install_mysql.sh"
    mysql.vm.provision "file", source: "mysql/FinalDump", destination: "$HOME/FinalDump"
    mysql.vm.provision "shell", path: "mysql/sql_dump.sh"
  end

end

