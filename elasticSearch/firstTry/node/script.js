process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const apiKeyId = 'x9FRx5gB4V11N55xO2pr';
const apiKeySecret = 'onLctt8ITbKk8y5oX_J5fg';

// Формируем строку base64
const encodedApiKey = Buffer.from(`${apiKeyId}:${apiKeySecret}`).toString('base64');

console.log(encodedApiKey);

const https = require('https');
const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'https://10.42.0.105:9200',
  auth: {
    apiKey: encodedApiKey, // используем закодированный API ключ
  },
  tls: {
    rejectUnauthorized: false // отключаем проверку сертификата
  },
  compatibleWith: 8 ,
});

client.ping({}, { requestTimeout: 10000 }, (error) => {
  if (error) {
    console.error('Elasticsearch cluster is down!');
  } else {
    console.log('Elasticsearch cluster is up!');
  }
});

async function run() {
  try {
    const body = [];

    for (let i = 0; i < 10000; i++) {  // 2 документа
      body.push({ create: { _index: 'test-index-00000' } }); // операция
      body.push({
        '@timestamp': new Date().toISOString(),
        message: 'Test message ' + i,
        description: 'Description for message ' + i
      });
    }

    const response = await client.bulk({ body });

    if (response.errors) {
      console.error(
        'Bulk insert had errors:',
        response.items.filter(item => item.create && item.create.error)
      );
    } else {
      console.log('Bulk insert successful:', response);
    }

  } catch (error) {
    console.error('Bulk insert error:', error);
  }
}

run();

// async function createIndex(indexName) {
//   await client.indices.create({
//     index: `${indexName || 'hot-warm-test-no-rollover-1'}`,
//     body: {
//       settings: {
//         "index.lifecycle.name": "hot_to_warm_1m"
//       }
//     }
//   });
//   console.log('Индекс создан');
// }


// async function reindexBulk(destIndex) {
//   const sourceIndex = 'hot-warm-test-no-rollover';

//   // Используем скролл для больших индексов
//   const scrollSearch = await client.helpers.scrollSearch({
//     index: sourceIndex,        // сколько документов за раз
//     body: {
//       query: { match_all: {} }
//     }
//   });

//   for await (const doc of scrollSearch) {
//     const body = [];
//     doc.documents.forEach(d => {
//       body.push({ index: { _index: destIndex, _id: d._id } });
//       body.push(d._source);
//     });

//     if (body.length > 0) {
//       await client.bulk({ refresh: true, body });
//     }
//   }

//   console.log('Данные перенесены через Bulk API');
// }
// for (let i = 1; i < 30; i++) {
//   let name = 'hot-warm-test-no-rollover'+ '-' + i;
//   reindexBulk(name).catch(console.log);
// }



