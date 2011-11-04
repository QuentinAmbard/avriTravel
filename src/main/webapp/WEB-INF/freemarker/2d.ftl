<#include "/header.ftl"/>
<!-- http://www.ginkgomaps.com/maps_world.html -->
<script type="text/javascript" src="/geoviadeo/resources/js/2d/geoviadeo2d.js"></script>

 <style type="text/css" media="screen">
canvas, img { display:block; margin:1em auto; border:1px solid black; }
canvas { background:url(/geoviadeo/resources/images/mapSmall.jpg) }
</style>
<canvas width="1500px" height="700px"></canvas>
<div id="container"></div>

<script type="text/javascript">
	var geoViadeo = new GeoViadeo2d('container');
</script>
<#include "/footer.ftl"/>