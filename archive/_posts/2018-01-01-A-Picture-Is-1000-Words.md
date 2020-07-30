---
title: APictureIs1000Words
layout: default
---
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="/assets/js/api1w.js" type="text/javascript"></script>
When the word "cliche" is mentioned, one of the first examples to pop to mind is "a picture is worth a thousand words." Why on Earth would I name a project that?

Growing up on the internet, images weren't always so easy to come by as today. Hosting sites sucked, and so did website design --- Reddit still lacks the ability to embed an image in comments, which is largely a relic of its creation. In a lot of places where images would be today, ASCII art was instead.

I always thought it was pretty cool to paint an image with just a few different characters and some whitespace, and wanted to see how to create these automatically. When I looked at existing projects, I found most of them take some pixel block, look at the matrix norm, and make a character map for the intensity. This works, but seemed pretty boring, and didn't capture the cool "edges" that outlined many old-school copy-pastas. That's I guess what justified making this tool.

Later I'll come back and talk about the math a bit, but for now my explanation will be brief: this takes a picture, runs edge detection, then a probabilistic Hough transform to find lines. Then it correlates these to characters. Voila! You can try below.

<div>
<div class="inputoutput">
<img id="imageSrc" alt="No Image" />
<div class="caption">imageSrc <input type="file" id="fileInput" name="file" /></div>
</div>
<div class="inputoutput">
<canvas id="canvasOutput" ></canvas>
<div class="caption">canvasOutput</div>
</div>
<div id="charoutput" style="font-family: 'Courier New', Courier, monospace; font-size: 5pt; fontSizeAdjust = 0.43; white-space: pre;">
</div>
</div>
