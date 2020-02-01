# moodsic

## Inspiration
We wanted to add additional entertainment to reading. We noticed how effective and personal sound and image can be, and wondered if adding appropriate multimedia layer to plain text would engage the reader more. Once we dug into AI services such as AWS Polly and the GCP Natural Language APIs, we knew our vision was within reach.

## What it does
BookTrax converts text into an audiobook with context-aware music and images. It analyzes the text and plays music that fits the tone. It also displays GIF imagery throughout the text playback based on key entities presented throughout the story.

## How we built it
Our first step was using AWS Polly to take text as an input, and output a speech file stream with that text. We then used the Google's Natural Language API to analyze the text, giving each one of the sentences a sentiment and magnitude score. Once we are getting these values prepared, we open data stream to create events with the chunks of data so that clients could listen to it. The sequence of audio chunks are fed into client side application using Web Audio API. Both on client and server sides, we used web socket to facilitate this data stream transferring. We used Node.js as our runtime on the server side. Our front-end runs with React.js.

## What we learned
We learned how complex and powerful the algorithms behind the Amazon and Google APIs were, including the ability to give numerical values to how positive or negative a sentence is. Some of us were unfamiliar with how APIs are implemented and learned how useful they are. For others, this was our first official hackathon and we learned that it is prudent to scope your project correctly.

## What's next for BookTrax
Our vision was to have the user more engaged when listening to BookTrax, and our goal to maximize that experience. What we also planned on was including dramatic transitions between audio tracks and selecting songs that would
