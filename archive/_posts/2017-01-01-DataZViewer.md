---
title: DataZViewer
layout: default
---
FIRST Robotics Competition (FRC) is a cool program that I participated in during high school (I wrote this code while I was on an FRC team my senior year of high school!), and Zebra Technologies is a company that helps support FRC. 

Part of what Zebra does is called Real Time Location Services (RLTS), basically a neat application of RFID technology to locate and identify a number of objects. When I was a senior in high school, Zebra began to mess around with applications of their RLTS products to FRC, in a program they were calling DataZ. They tested this at a local off-season event my team attended, and then just had tons of data. At the time no-one had anything to use in visualizing that data, so I wrote this. It's kind of jank, but was something productive in high school, and actually got me noticed a bit.

I've since lost track of the project, as DataZ had appeared to die amongst its journey through multiple bureaucracies. [However, it looks as though it was renamed, and has made significant progress in becoming a real thing!](https://www.zebra.com/us/en/blog/posts/2020/enabling-first-robotics-students-to-explore-their-edge.html)

Anyways, here's something I wrote a long time ago... I promise my code is better nowadays.
<link rel="stylesheet" href="/assets/css/datazstyle.css" type="text/css">
<div class="container">
<canvas id="canvas" width="1000" height="500"></canvas>
<br/>
<input type="file" id="files" name="files[]" multiple />
<div style="text-align: center; width: 300px">
Speed:
</div>
<input type="range" min="1" max="1000" value="500" class="slider" id="speed" class="slider">
<br/>
<button id="initiator" class="button">Click to draw.</button>
<br/>
<button id="pause-button" class="button">Click to pause.</button>
<br/>
<button id="play-button" class="button">Click to play.</button>
<br/>
</div>
<script type="text/javascript" src="/assets/js/datazdraw.js"></script>
