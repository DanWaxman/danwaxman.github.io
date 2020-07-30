# danwaxman.github.io

<h1>Latest Posts</h1>

<ul>
    {% for post in site.posts %}
        <li>
            <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
                  <p>{{ post.excerpt }}</p>
        </li>
    {% endfor %}
</ul>

Some projects I've worked on/am working on.

[Lissajous](Lissajous) is a [Lissajous Curve](https://en.wikipedia.org/wiki/Lissajous_curve) generator, creating animations of a Lissajous curve based on customized parameters.

[APictureIs1000Words](APictureIs1000Words) is an image-to-ASCII converter using OpenCV.js. It works by first running a Canny Edge Detection algorithm on an image, then seeing if a Probabilistic Hough Transform recognizes any lines. It's a bit slow on mobile devices thanks to the overkill that is OpenCV for this project, but works okay in browsers with WebAssembly support on a desktop.

[DataZViewer](DataZViewer) is a viewer for data by DataZ, a cool application of RFID technology to FRC Robotics by Zebra Technologies. The viewer is a bit outdated at this point, as the technology never really seemed to take off, but is a neat display of what could have been I suppose.

