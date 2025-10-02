---
tags: []
up:
related:
created: 2025-05-15
modified: 2025-05-15
---
 Nginx 中，可以通过 加权轮询（Weighted Round Robin） 或 split_clients 模块来实现 流量按比例转发。以下是两种常见的实现方式：

## 加权轮询（Weighted Round Robin）

加权轮询是 Nginx 默认支持的负载均衡策略之一。通过为不同的后端服务器分配不同的权重，可以实现流量按比例转发。  
(1) 配置示例  

```nginx
http {  
    upstream backend {  
        server backend1.example.com weight=3; # 权重为 3  
        server backend2.example.com weight=2; # 权重为 2  
        server backend3.example.com weight=1; # 权重为 1  
    }

    server {  
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }  
}
```

(2) 说明

weight 参数表示权重，权重越高，分配的流量越多。  
上述配置中，backend1 会接收 50% 的流量（3/(3+2+1)），backend2 会接收 33.3% 的流量，backend3 会接收 16.7% 的流量。

(3) 适用场景

适用于简单的流量按比例转发需求。  
权重是静态的，无法根据请求内容动态调整。

## 使用 split_clients 模块

split_clients 是 Nginx 的一个模块，可以根据变量的值将流量按比例分配到不同的后端服务器。  
(1) 配置示例  

```nginx
http {

    split_clients "${remote_addr}${http_user_agent}" $backend {
        50%  backend1;  # 50% 的流量转发到 backend1
        30%  backend2;  # 30% 的流量转发到 backend2
        *    backend3;  # 剩余的 20% 流量转发到 backend3
    }

    upstream backend1 {
        server backend1.example.com;
    }

    upstream backend2 {
        server backend2.example.com;
    }

    upstream backend3 {
        server backend3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://$backend;
        }
    }
}
```

(2) 说明

split_clients 根据 `${remote_addr}${http_user_agent}` 的值生成一个哈希值，并根据比例分配流量。  
上述配置中：

50% 的流量会转发到 backend1。  
30% 的流量会转发到 backend2。  
剩余的 20% 流量会转发到 backend3。



(3) 适用场景

适用于需要根据请求内容动态分配流量的场景。  
可以根据客户端 IP、User-Agent 等变量进行流量分配。

## 使用 map 模块

map 模块也可以实现流量按比例转发，类似于 split_clients，但更加灵活。  
(1) 配置示例  

```nginx
http {
    map $remote_addr $backend {
        default backend3;  # 默认转发到 backend3
        ~^1\.1\.1\.1 backend1;  # 特定 IP 转发到 backend1
        ~^2\.2\.2\.2 backend2;  # 特定 IP 转发到 backend2
    }

    upstream backend1 {
        server backend1.example.com;
    }

    upstream backend2 {
        server backend2.example.com;
    }

    upstream backend3 {
        server backend3.example.com;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://$backend;
        }
    }
}
```

(2) 说明

map 模块根据 ${remote_addr} 的值匹配规则，并将流量转发到对应的后端服务器。


上述配置中：  
IP 为 1.1.1.1 的请求会转发到 backend1。  
IP 为 2.2.2.2 的请求会转发到 backend2。  
其他请求会转发到 backend3。


(3) 适用场景

适用于需要根据特定条件（如 IP、Header 等）动态分配流量的场景。

## 总结

加权轮询 简单易用，静态权重分配简单的流量按比例转发需求  
split_clients 根据变量值动态分配流量需要动态分配流量的场景  
map 根据条件（如 IP、Header）动态分配流量需要复杂条件匹配的场景
