# Moodsic
Mood classification using spectrograms of sound

## Inspiration
Music streaming platforms such as Spotify and Apple Music recommend a list of songs that are generally known to be associated with a certain mood. We aim to programmatically sort out the songs based on the mood without a person individually tagging all the songs.

## Spectrogram
A **spectrogram** is a visual representation of the spectrum of frequencies of a signal as it varies with time. We used these images of sound to train our convolutional neural network based model.

### Spectrogram Generation
Each of the songs was sampled from minute 1 to 2 (1minute span), and the resulting image was converted to a black and white scale.

## Model-less Classification
As implausible as it may sound, this project does not contain a single line of code of a neural network. Moodsic utilizes cloud-base machine intelligence, and in this case it employs AutoML of Google Cloud Platform (GCP). We fed the data with the labels tagged (supervised learning) in order to train some generic-purpose image processing model provided by GCP. Check [AutoML](https://cloud.google.com/vision/automl/docs/tutorial) for more information.

### 100 Songs for Training
We manually tagged a hundred different songs to train the model. The names and labels of the songs are listed in [DATA.md](https://github.com/eldeni/moodsic/blob/master/DATA.txt). With these songs, we trained our AutoML model with the precision of 75%.

## Project
This is a multi-module project that consists of the following.

- moodsic-web
- moodsic-web-backend
- spectrogram-creator

## Get Started
```
npm run dev                                    To develop, runs `web` and `backend`
npm run spectrogram [audioPath?] [outputPath?] To run spectrogram generator
npm run web                                    To run web-based visualizer
```

Most likely `moodsic-web-backend` won't work on your machine right off you install. This is because you don't have a model on GCP and related token yet. The path to **GOOGLE_APPLICATION_CREDENTIALS** is set to be `$HOME_PATH/.gcloud/key-1.json` . To learn how to train models on AutoML, check its website.

## Implications

### Machine Learning on Sound
Sound may be processed by neural networks either as a sequence of frequency data, where a value at a certain timeframe may be relevant to the ones before, or as a set of quanitites (pixels) in a coordinate system (spectrogram). In the case of songs, we know the exact length of data and it is fairly short to convert them to images. Treating sound as imagery does seem to yield some interesting observations. Similiar approaches have been proposed in the academia for a while, and the practice may permeate to the industry in the near future.

### Cloud-based
By this time around, a lot of people are aware of the use and power of artificial neural network. The deep learning based machine intelligence seems to be facing another turnaround since it is now made ever more accessible as on the cloud platform. Various attempts at exploiting artificial intelligence are expected.


## HackSC 2020
This is a product worked during [HackSC 2020](https://hacksc.com/), by a team of the following.

- Elden Park <eldeniyenden@gmail.com>
- Victoria Shin
- Jennie Jeh
- Hyunjae Cho
- Prasanna Natarajan
