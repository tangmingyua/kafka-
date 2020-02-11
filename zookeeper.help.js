const zookeeper = require('node-zookeeper-client');

function getNodeInfo(client, id) {
    return new Promise((resolve, reject) => {
        const path = '/brokers/ids';
        client.getData(path + '/' + id, function (err, data) {
            if (err) return reject(err);
            resolve(nodeInfo = JSON.parse('' + data));
        });
    });
}

function getBrokers(zookeeperUrl) {
    return new Promise((resolve, reject) => {
        const client = zookeeper.createClient(zookeeperUrl);
        const path = '/brokers/ids';
        client.once('connected', function () {
            client.getChildren(path, function (err, nodeIds) {
                if (err) {
                    client.close();
                    return reject(err);
                }
                if (nodeIds.length === 0) {
                    client.close();
                    return reject(new Error('GetChildren returns no node'));
                }
                resolve(Promise.all(
                    nodeIds.map(id => getNodeInfo(client, id))
                ));
                // const nodeInfo = await getNodeInfo(client, id);
                // addrStr += nodeInfo.host + ':' + nodeInfo.port;
                client.close();
            });
        });
        client.connect();
    });
}

function getBrokersAddr(brokers) {
    let addrStr = '';
    brokers.forEach(b => {
        addrStr += b.host + ':' + b.port;
    });
    return addrStr;
}
