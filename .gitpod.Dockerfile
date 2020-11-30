FROM ubuntu:20.04

RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN sudo apt update
RUN sudo apt install -y nodejs=14.10.1 g++ python3-dev libffi-dev openssl-dev make
RUN pip3 install --upgrade pip setuptools