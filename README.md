# kafka-
kafka问题记录

producer的acks含义
0：这意味着生产者producer不等待来自broker同步完成的确认继续发送下一条（批）消息。此选项提供最低的延迟但最弱的耐久性保证（当服务器发生故障时某些数据会丢失，如leader已死，但producer并不知情，发出去的信息broker就收不到）。

1：这意味着producer在leader已成功收到的数据并得到确认后发送下一条message。此选项提供了更好的耐久性为客户等待服务器确认请求成功（被写入死亡leader但尚未复制将失去了唯一的消息）。

-1：这意味着producer在follower副本确认接收到数据后才算一次发送完成。 
此选项提供最好的耐久性，我们保证没有信息将丢失，只要至少一个同步副本保持存活。

三种机制，性能依次递减 (producer吞吐量降低)，数据健壮性则依次递增。

并发过高情况下反复连接kafka会报错：连接超时
可以使用连接池(generic-pool实现)


nodejs的kafka模块并没有直接支持zookeeper模式
需要使用node-zookeeper-client获取brokers 来实现集群模式
代码查看 zookeeper.help.js
