// import { NextResponse } from 'next/server';
// import nsfw from 'nsfwjs';
// import * as tf from '@tensorflow/tfjs-node';

// let model;

// async function loadModel() {
//   if (!model) {
//     model = await nsfw.load();
//   }
//   return model;
// }

// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('image');

//     if (!file) {
//       return NextResponse.json({ error: 'No image provided' }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const imageTensor = tf.node.decodeImage(buffer, 3);

//     const nsfwModel = await loadModel();
//     const predictions = await nsfwModel.classify(imageTensor);

//     imageTensor.dispose();

//     // Find porn or sexy probability
//     const porn = predictions.find(p => p.className === 'Porn');
//     const sexy = predictions.find(p => p.className === 'Sexy');

//     const isUnsafe =
//       (porn && porn.probability > 0.7) ||
//       (sexy && sexy.probability > 0.7);

//     return NextResponse.json({
//       isSafe: !isUnsafe,
//       predictions,
//     });

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Server error' }, { status: 500 });
//   }
// }