---
layout: page
permalink: /research/
title: research
description:
nav: true
nav_order: 1
---

My main research interests include:

- Bayesian learning — particularly in dynamical systems or online settings
- Causal inference — particularly causal structure learning and problems with confounders
- Fusion and ensembling methods — particularly of Bayesian models

## publications

\* denotes equal contribution; † denotes a student or intern primarily supervised by me.

### preprints and articles in review

<div class="publications">
{% bibliography -f {{ site.scholar.bibliography }} --query @*[publication_type=preprint]* %}
</div>

### journal papers

<div class="publications">
{% bibliography -f {{ site.scholar.bibliography }} --query @*[publication_type=journal]* %}
</div>

### conference papers

<div class="publications">
{% bibliography -f {{ site.scholar.bibliography }} --query @*[publication_type=conference]* %}
</div>

### workshop proceedings & professional meeting abstracts

<div class="publications">
{% bibliography -f {{ site.scholar.bibliography }} --query @*[publication_type=abstract]* %}
</div>

## talks

### upcoming talks

{% assign upcoming_talks = site.data.talks | where: 'section', 'upcoming' %}
{% include talk_list.html talks=upcoming_talks %}

### recent talks

<div class="talks recent-talks">
{% assign recent_talks = site.data.talks | where: 'section', 'recent' %}
{% for talk in recent_talks %}
  {% include talk_row.html talk=talk heading_level=4 show_context=true %}
{% endfor %}
</div>

### earlier invited talks

{% assign earlier_invited_talks = site.data.talks | where: 'section', 'archive' | where: 'kind', 'invited' %}
{% include talk_list.html talks=earlier_invited_talks %}

### earlier contributed talks

{% assign earlier_contributed_talks = site.data.talks | where: 'section', 'archive' | where: 'kind', 'contributed' %}
{% include talk_list.html talks=earlier_contributed_talks %}
