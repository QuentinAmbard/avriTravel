<#include "/header.ftl"/>
<#include "/headerMenu.ftl"/>

  <script type="text/javascript">
    window.addEvent('domready', function() { 
        if(!Detector.webgl){
          Detector.addGetWebGLMessage();
        } else {
            //var geoViadeo = new GeoViadeo('container');
            //geoViadeo.start();
        }
    });
  </script>
<#include "/footer.ftl"/>