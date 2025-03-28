<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js" integrity="sha512-WFN04846sdKMIP5LKNphMaWzU7YpMyCU245etK3g/2ARYbPK9Ub18eG+ljU96qKRCWh+quCY7yefSmlkQw1ANQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js" integrity="sha256-Y26AMvaIfrZ1EQU49pf6H4QzVTrOI8m9wQYKkftBt4s=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/patternomaly@1.3.2/dist/patternomaly.js"></script>
{% if page.indicator and (page.indicator.graph_annotations or page.indicator.graph_target_lines or page.indicator.graph_series_breaks or page.indicator.graph_error_bars or page.indicator.graph_target_points or page.indicator.graph_target_labels) %}
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@1.2.2/dist/chartjs-plugin-annotation.min.js" integrity="sha256-XuHhf6q+GD7fscc96mTm/228GXf1Nn9wOYOE0EgeFzY=" crossorigin="anonymous"></script>
{% endif %}
{% if page.indicator and page.indicator.data_show_map %}
<script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js" integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==" crossorigin=""></script>
<script src="https://cdn.jsdelivr.net/npm/leaflet.zoomshowhide@0.1.0/dist/leaflet-zoom-show-hide.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.4.0/chroma.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/iso8601-js-period@0.2.1/iso8601.min.js"></script>
<script src="https://cdn.rawgit.com/socib/Leaflet.TimeDimension/master/dist/leaflet.timedimension.min.js"></script>
<script src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js'></script>
<script src="https://cdn.jsdelivr.net/gh/torfsen/leaflet.zoomhome@master/dist/leaflet.zoomhome.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/leaflet-search@2.9.7/dist/leaflet-search.min.js"></script>
{% endif %}
<script src="https://cdnjs.cloudflare.com/ajax/libs/autotrack/2.4.1/autotrack.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.3/dist/html2canvas.js"></script>
<script src="https://cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js"></script>

{% if site.cookie_consent_form.enabled %}
<script>
  {% include cookies-config.js %}
  {% include cookies-translations.js %}
</script>
<script src="https://cdn.kiprotect.com/klaro/v0.7/klaro-no-css.js"></script>
{% include multilingual-js.html key="cookies.cookie_settings" %}
{% endif %}

{% if site.analytics.ua and site.analytics.ua != '' %}
  {% include components/analytics/ga-universal.html %}
{% endif %}
{% if site.analytics.ga_prod and site.analytics.ga_prod != '' %}
  {% include components/analytics/ga-universal.html %}
{% endif %}
{% if site.analytics.gtm and site.analytics.gtm != '' %}
  {% include components/analytics/ga-gtm-noscript.html %}
{% endif %}

{% include multilingual-js.html key="general.hide" %}
{% include multilingual-js.html key="search.search" %}
<script src='{{ site.baseurl }}/assets/js/sdg.js?v={{ cache_bust }}'></script>
{% include scripts-custom.html %}
{%- if site.custom_js -%}
  {%- for custom_js_file in site.custom_js -%}
    {% assign script_src = custom_js_file %}
    {% assign src_start = script_src | slice: 0, 4 %}
    {% if src_start != 'http' %}
      {%- assign script_src = site.baseurl | append: script_src | append: "?v=" | append: cache_bust %}
    {% endif %}
    <script src="{{ script_src }}"></script>
  {%- endfor -%}
{%- endif -%}
<script>
    new indicatorInit();
    new accessibilitySwitcher();
</script>
