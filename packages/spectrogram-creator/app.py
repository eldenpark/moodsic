import sys
import os

def addLibLookupPath():
  lookupPath = os.path.join(os.getcwd(), "env/lib/python3.7/site-packages")

  if os.path.exists(lookupPath) is False:
    print("addLibLookupPath(): WARN! lookupPath does not exist at: %s" % lookupPath)
  else:
    print("addLibLookupPath(): found lookupPath: %s" % lookupPath)

  sys.path.append(lookupPath)
  print("addLibLookupPath(): sys.path: %s" % sys.path)

addLibLookupPath()

from skimage import io
import librosa
import numpy
import skimage

excludeFileExtension = [
  ".png",
  ".gitkeep",
  ".DS_Store",
]

def scale_minmax(X, min = 0.0, max = 1.0):
  X_std = (X - X.min()) / (X.max() - X.min())
  X_scaled = X_std * (max - min) + min
  return X_scaled

def spectrogram_image(y, sr, out, hop_length, n_mels):
  mels = librosa.feature.melspectrogram(
    y = y,
    sr = sr,
    n_mels = n_mels,
    n_fft = hop_length * 2,
    hop_length = hop_length
  )
  mels = numpy.log(mels + 1e-9) # add small number to avoid log(0)

  # min-max scale to fit inside 8-bit range
  img = scale_minmax(mels, 0, 255).astype(numpy.uint8)
  img = numpy.flip(img, axis = 0) # put low frequencies at the bottom in image
  img = 255 - img # invert. make black==more energy

  io.imsave(out, img) # png
  print('spectrogram_image(): wrote file at: %s' % out)

def create(audioPath = "audio", outputPath = "output"):
  audioRealPath = os.path.join(os.getcwd(), audioPath)
  print("create(): audioPath: %s, audioRealPath: %s" % (audioPath, audioRealPath))

  for fname in os.listdir(audioRealPath):
    if fname not in excludeFileExtension:
      audioFilename = os.path.join(audioRealPath, fname)
      print("create(): audioFilename: %s" % audioFilename)

      hop_length = 512 # number of samples per time-step in spectrogram
      n_mels = 128 # number of bins in spectrogram. Height of image
      time_steps = 2000 # number of time-steps. Width of image

      y, sr = librosa.load(
        path = audioFilename,
        offset = 60.0,
        duration = 50.0,
        sr = 22050
      )
      imageFilePath = os.path.join(os.getcwd(), outputPath, fname + ".png")

      start_sample = 0 # starting at beginning
      length_samples = time_steps * hop_length
      window = y[start_sample : (start_sample + length_samples)]

      spectrogram_image(
        window,
        sr = sr,
        out = imageFilePath,
        hop_length = hop_length,
        n_mels = n_mels
      )

    else:
      pass

if __name__ == '__main__':
  print("launch app.py, sys.argv: %s" % sys.argv)
  create(audioPath = sys.argv[1] if len(sys.argv) > 1 else "audio")
