//haritayı getirme kodu
window.onload = harita; //sayfa ilk açıldığında 

var Map;
var vectorSource = new ol.source.Vector({
    wrapX: false});
//var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({ source: vectorSource });
var coordinates;
var btn = document.getElementById("button");
var btnGuncelle = document.getElementById("button1");

function selectInteraction(){
       fetch("https://localhost:7182/Location3",{ //verinin gonderilecegi, swaggerden donen url
       method:'GET',
       headers:{
              'Accept':'application/json, text/plain',
              'Content-Type':'application/json;charset=UTF-8'
       },
       })
       .then(response=>response.json())
       .then(data=>{
              array2=data.value;
              for(let index2=0;index2<array2.length;index2++){
                     id_=array2[index2].id;
                     name_=array2[index2].name;
                     x_=array2[index2].x;
                     y_=array2[index2].y;
              }
              console.log(name_)
       Map.on('singleclick',function(e){
       Map.forEachFeatureAtPixel(e.pixel,function(f){
              guncelPanel();
       var interactionId=id_;
       $("#idText").val(interactionId);
       var interactionName=name_;
       $("#NameTextt").val(interactionName);
       var interactionX=x_;
       $("#xKonum").val(interactionX);

       


       })
       })
       })
}



// function selectInteraction(){
//     fetch("https://localhost:7182/Location3", { //verinin gonderilecegi url
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json, text/plain',
//         'Content-Type': 'application/json;charset=UTF-8'
//     },
// })
//   .then(response=>response.json())
//   .then(data =>{    
//     array2 = data.value;
//     for(let index2=0 ; index2< array2.length; index2++){
//             id_ =array2[index2].id;
//             name_ =array2[index2].name;
//             x_ =array2[index2].x;
//             y_ =array2[index2].y;
            
//         }
        
//         console.log(name_)
//     Map.on('singleclick', function (e) {
//     Map.forEachFeatureAtPixel(e.pixel, function (f) {    
//        guncelPanel();
//     var interactionId = id_;
//     $("#idText").val(interactionId);
//     var interacitonName = name_;
//     $("#NameTextt").val(interacitonName);
//     var interactionX = x_
//     $("#xKonum").val(interactionX);
//     var interactionY = y_
//     $("#yKonum").val(interactionY);                               
//     })
    
//   });

// })
// }


interactionGetir();
function interactionGetir(){

    fetch("https://localhost:7182/Location3", { //verinin gonderilecegi url
    method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    },
})
  .then(response=>response.json())
  .then(data =>{    
    element = data.value;
      for (let index = 0; index < element.length; index++) {
        let feature = new ol.Feature({
          geometry: new ol.geom.Point([element[index].x , element[index].y]),
          name: element[index].name,
          population: 4000,
          rainfall: 500,
        });
        vectorSource.addFeature(feature);
      };
  });
}
let guncellePanel = null;
let eklePanel=null;
let interactionguncellePanel=null;
const panelOlustur = (coords) =>
{
    if(eklePanel){
        eklePanel.close();
    }
    eklePanel=jsPanel.create({
        theme: 'dark',
        headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
        headerTitle: 'NOKTA EKLE',
        headerToolbar: '<span class="text-sm">Nokta Ekle ...</span>',
        footerToolbar: '<span class="flex flex-grow">You can have a footer toolbar too</span>' +
            '<i class="fal fa-clock mr-2"></i><span class="clock">loading ...</span>',
        panelSize: {
            width: () => { return Math.min(800, window.innerWidth * 0.9); },
            height: () => { return Math.min(500, window.innerHeight * 0.6); }
        },
        animateIn: 'jsPanelFadeIn',

        content: `
        <center>
        <label style=weight:100;height:50;font-size:25px;font-weight:bolder; value="Konum Adı:">Konum Adı</label></br>
        <input style=font-size:25px; type="text" id="NameText"/></br></br>
        <label style=weight:100;height:50;font-size:25px;font-weight:bolder; value="Konum Adı:">X Koordinatı</label></br>
        <input style=font-size:25px; type="text" id="xKonum" value=${coords[0]} readonly/></br></br>
        <label style=weight:100;height:50;font-size:25px;font-weight:bolder; value="Konum Adı:">Y Koordinatı</label></br>
        <input style=font-size:25px; type="text" id="yKonum" value=${coords[1]} readonly/></br></br></br>
        <button id="btnekle" style=font-size:25px; onclick="ekleButon()">Ekle</button> </center>
        `,
        onwindowresize: true,
        callback: function (panel) {
            function clock() {
                let time = new Date(),
                    hours = time.getHours(),
                    minutes = time.getMinutes(),
                    seconds = time.getSeconds();
                panel.footer.querySelectorAll('.clock')[0].innerHTML = `${harold(hours)}:${harold(minutes)}:${harold(seconds)}`;
                function harold(standIn) {
                    if (standIn < 10) { standIn = '0' + standIn; }
                    return standIn;
                }
            }
            setInterval(clock, 1000);
        }
})};
const UpdateDelete = (data) =>
{  
    if(guncellePanel)
    {
        guncellePanel.close();
    }
    guncellePanel = jsPanel.create({
        theme: 'dark',
        headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
        headerTitle: 'GÜNCELLE/SİL',
        headerToolbar: '<span class="text-sm">Güncelleme ve Silme İşlemleri...</span>',
        footerToolbar: '<span class="flex flex-grow">You can have a footer toolbar too</span>' +
            '<i class="fal fa-clock mr-2"></i><span class="clock">loading ...</span>',
        panelSize: {
            width: () => { return Math.min(800, window.innerWidth * 0.9); },
            height: () => { return Math.min(500, window.innerHeight * 0.6); }
        },
        animateIn: 'jsPanelFadeIn',
        content: `
        <center>
        <label style=font-size:25px;weight:100;height:50;font-weight:bolder; id="idLabel" value="Konum ID:">Konum ID:</label></br>
        <input style=font-size:25px; type="text" id="idText" value=${data.id} readonly/> </br></br>
        <label style=font-size:25px;weight:100;height:50;font-weight:bolder; id="konumLabel" value="Konum Adı:">Konum Adı</label></br>
        <input style=font-size:25px; type="text" id="NameTextt" value=${data.name} /> </br></br>
        <label style=font-size:25px;weight:100;height:50;font-weight:bolder; id="xLabel" value="Konum Adı:">X Koordinatı</label></br>
        <input style=font-size:25px; type="text" id="xKonum" value=${data.x} readonly/></br></br>
        <label style=font-size:25px;weight:100;height:50;font-weight:bolder; id="yLabel" value="Konum Adı:">Y Koordinatı</label></br>
        <input style=font-size:25px; type="text" id="yKonum" value=${data.y} readonly/></br></br></br>
        <button id="btnguncelle" style=font-size:25px;float:right" onclick="guncelleButon()">Güncelle</button>
        <button id="btnsil" style=font-size:25px;float:right"  onclick="silButon()">Sil</button> 
        
        `,
        onwindowresize: true,
        callback: function (panel) {
            function clock() {
                let time = new Date(),
                    hours = time.getHours(),
                    minutes = time.getMinutes(),
                    seconds = time.getSeconds();
                panel.footer.querySelectorAll('.clock')[0].innerHTML = `${harold(hours)}:${harold(minutes)}:${harold(seconds)}`;
                function harold(standIn) {
                    if (standIn < 10) { standIn = '0' + standIn; }
                    return standIn;
                }
            }
            setInterval(clock, 1000);
        }
    });
}




const interactionduzenle = (data) =>
{  
    if(interactionguncellePanel)
    {
        interactionguncellePanel.close();
    }
    interactionguncellePanel = jsPanel.create({
        theme: 'dark',
        headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
        headerTitle: 'GÜNCELLE/SİL',
        headerToolbar: '<span class="text-sm">Güncelleme ve Silme İşlemleri...</span>',
        footerToolbar: '<span class="flex flex-grow">You can have a footer toolbar too</span>' +
            '<i class="fal fa-clock mr-2"></i><span class="clock">loading ...</span>',
        panelSize: {
            width: () => { return Math.min(800, window.innerWidth * 0.9); },
            height: () => { return Math.min(500, window.innerHeight * 0.6); }
        },
        animateIn: 'jsPanelFadeIn',
        content: `
        <center>
        <label style=font-size:25px;weight:100;height:50;font-weight:bolder; id="idLabel" value="Konum ID:">Konum ID:</label></br>
        <input style=font-size:25px; type="text" id="IdTextGuncelInteraction" value=${guncellenmisId} readonly/> </br></br>
        <label style=font-size:25px;weight:100;height:50;font-weight:bolder; id="konumLabel" value="Konum Adı:">Konum Adı</label></br>
        <input style=font-size:25px; type="text" id="NameTextGuncelInteraction" value=${guncellenmisName} /> </br></br>
        <label style=font-size:25px;weight:100;height:50;font-weight:bolder; id="xLabel" value="Konum Adı:">X Koordinatı</label></br>
        <input style=font-size:25px; type="text" id="xKonumGuncelInteraction" value=${guncellenmisX} readonly/></br></br>
        <label style=font-size:25px;weight:100;height:50;font-weight:bolder; id="yLabel" value="Konum Adı:">Y Koordinatı</label></br>
        <input style=font-size:25px; type="text" id="yKonumGuncelInteraction" value=${guncellenmisY} readonly/></br></br></br>
        <button id="btnguncelle" style=font-size:25px;float:right" onclick="guncelleButon()">Güncelle</button>
        <button id="btnsil" style=font-size:25px;float:right"  onclick="silButon()">Sil</button> 
        
        `,
        onwindowresize: true,
        callback: function (panel) {
            function clock() {
                let time = new Date(),
                    hours = time.getHours(),
                    minutes = time.getMinutes(),
                    seconds = time.getSeconds();
                panel.footer.querySelectorAll('.clock')[0].innerHTML = `${harold(hours)}:${harold(minutes)}:${harold(seconds)}`;
                function harold(standIn) {
                    if (standIn < 10) { standIn = '0' + standIn; }
                    return standIn;
                }
            }
            setInterval(clock, 1000);
        }
    });
}




async function veriCek() {
    return new Promise((resolve,reject) =>fetch("https://localhost:7182/Location3")
        .then(res => {
            if (res.ok) { console.log("HTTP Calisiyor") }
            else { console.log("Getirilemedi") }
            return res
        })
        .then(res => res.json())
        .then(data => {
        
            //if ($('#my-table')?.DataTable() == null) console.log($('#my-table')?.DataTable())
            $('#my-table tbody').off('dblclick','tr')
            const dataTable = $('#my-table').DataTable( {
                destroy: true, 
                data: data.value,
                columns: [
                    { data: 'id', title: 'ID' }, 
                    { data: 'name', title: 'Konum Adı' },
                    { data: 'x',title: 'X Koordinatı' },
                    { data: 'y',title: 'Y Koordinatı' } 
                ]
            } ); 
            $('#my-table tbody').on('dblclick','tr',function(e){
                const data = dataTable.row( this ).data();
        
                UpdateDelete(data);
            })
            resolve(dataTable)
            return dataTable    
        })

        .catch(error => {
            console.log(error);
            reject(error)
            throw error
        })
    )
}
const guncelPanel = (coords) =>
{
    
    jsPanel.create({
        theme: 'dark',
        headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
        headerTitle: 'NOKTA SORGULA',
        headerToolbar: '<span class="text-sm">Nokta Sorgula ...</span>',
        footerToolbar: '<span class="flex flex-grow">You can have a footer toolbar too</span>' +
            '<i class="fal fa-clock mr-2"></i><span class="clock">loading ...</span>',
        panelSize: {
            width: () => { return Math.min(800, window.innerWidth * 0.9); },
            height: () => { return Math.min(500, window.innerHeight * 0.6); }
        },
        animateIn: 'jsPanelFadeIn',
        content: "<table id='my-table'/>",
        onwindowresize: true,
        callback: function (panel) {
            function clock() {
                let time = new Date(),
                    hours = time.getHours(),
                    minutes = time.getMinutes(),
                    seconds = time.getSeconds();
                panel.footer.querySelectorAll('.clock')[0].innerHTML = `${harold(hours)}:${harold(minutes)}:${harold(seconds)}`;
                function harold(standIn) {
                    if (standIn < 10) { standIn = '0' + standIn; }
                    return standIn;
                }
            }
            setInterval(clock, 1000);
        }
    });
    veriCek();
    
}
function ekleButon() {
    var _name = document.getElementById("NameText").value;
    //alert("eklendi");
    const data = {
        x: coordinates[0],
        y: coordinates[1],
        name: _name
    };
    //let response = fetch("https://localhost:7182/Location3");
    fetch("https://localhost:7182/Location3", { //verinin gonderilecegi url
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data),   //body ozelligine gonderilecek veri yazilir

    })
        .then(response => response.json()) //promise yapisi doner
        .then(data => {
            console.log('Success:', data);
            eklePanel.close();
            $.notify("Eklendi","success");
        })
        
        .catch((error) => {
            console.error('Error:', error); //hata alirsak konsola yazdirarak hatayi gorebiliriz
            $.notify("Bir sorun oluştu","warn")
        })
}


function silButon(){
    var id=document.getElementById("idText").value;
    //var id=$("idText").val();

    Swal.fire({
        title:'Silmek istediğinize emin misiniz?',
        showDenyButton: true,  showCancelButton: true,  
        confirmButtonText: `Sil`,  
        denyButtonText: `Silmekten Vazgeç`,
    }).then((result)=>{
        if(result.isConfirmed){
            fetch( "https://localhost:7182/Location3" + '?id=' + id, {
            method: 'DELETE',
            })
            .then(res=>res.text())
            .then(res=>console.log(res))
            guncellePanel.close();
            Swal.fire("Silindi",'','success')
            veriCek()
            interactionGetir()
        }else if(result.isDenied){
            Swal.fire("Silinmedi",'','info')
            
        }
    }) 
}

function guncelleButon(){
    //var _name=$("NameText").val();
    var _name=document.getElementById("NameTextt").value ;
    var id=document.getElementById("idText").value;
    //alert("eklendi");
    const data={
        name: _name
    };
    //let response = fetch("https://localhost:7182/Location3");
    fetch("https://localhost:7182/Location3" +'?id='+id,{ //verinin gonderilecegi url
    method: 'PUT',

    headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    },
        body: JSON.stringify(data),   //body ozelligine gonderilecek veri yazilir

    })
    .then(response=>response.json()) //promise yapisi doner
    .then(data=>{console.log('Success:',data);
    guncellePanel.close();
    $.notify("Güncellendi","success");
    veriCek()
    })
    .catch((error)=>{
        console.error('Error:',error); //hata alirsak konsola yazdirarak hatayi gorebiliriz
        $.notify("Güncellenemedi","error")
    })

}


function harita() {
    Map = new ol.Map({
        //View, Layers ve Target bu 3ü  zorunlu elemanlardır.
        view: new ol.View({// görüntümüzü ayarlayacağımız bölümdür.
            center: [3646164.0984667353, 4847765.351090939], //
            zoom: 9.769803598351844,
            maxZoom: 100,
            minZoom: 2,
        }),
        layers: [ //katman ve altyapı seçeceğimiz bölümdür
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        target: 'js-map' //html'de nereye gideceğimizi belirler
    })
    const draw = new ol.interaction.Draw({
        source: vectorSource,
        type: "Point"
    })
    Map.addInteraction(draw);
    draw.setActive(false);
    draw.on("drawend", (event) => {
        //alert(event.feature.getGeometry().getCoordinates());
        coordinates = event.feature.getGeometry().getCoordinates();
        panelOlustur(coordinates);
        $('#myTable').DataTable();
    })
    btn.onclick = function () {
        draw.setActive(true);
    };
    btnGuncelle.onclick = function () {
        guncelPanel();   
    }



    Map.on('singleclick', function (event) {
        // getData(event.coordinate);
   
        Map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
            let _layer = layer;
            let _feature = feature;

            //panel açıksa kapatalım.
            if(interactionguncellePanel){
                interactionguncellePanel.close();
            }
            if(eklePanel){
                if(interactionguncellePanel){
                    interactionguncellePanel.close()
                }
            }
            else{
            //paneli çağıralım
            interactionduzenle();
            
            //panele değerleri yazdıralım.
            var guncellenmisId = _feature.getId();
            $("#IdTextGuncelInteraction").val(guncellenmisId);
    
            var guncellenmisName = _feature.getProperties().name;
            $("#NameTextGuncelInteraction").val(guncellenmisName);
    
            var guncellenmisX = _feature.getGeometry().getCoordinates()[0];
            $("#xKonumGuncelInteraction").val(guncellenmisX);
            
            var guncellenmisY =  _feature.getGeometry().getCoordinates()[1];
            $("#yKonumGuncelInteraction").val(guncellenmisY);
        }
        });
    });
}

