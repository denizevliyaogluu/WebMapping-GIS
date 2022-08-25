using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Staj.Data;
using System.Globalization;

namespace Staj.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Location3Controller : ControllerBase
    {
        private readonly DataContext _context;
        public Location3Controller(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public Response Get()
        {
            var _response = new Response();
            var test = ((from _context in _context.LinqLocations select _context).ToList().OrderBy(x=>x.Id));
            _response.Value = test;
            return _response;
        }

        [HttpGet("{id}")]
        public Response GetById(int id)
        {
            var _response = new Response();
            var kontrol= from _context in _context.LinqLocations where _context.Id == id select _context;
            if (kontrol == null) {
                _response.Result = "bulunamadý";
            }
            else {
                _response.Value = kontrol;
            }
            return _response;
        }

        [HttpDelete]
        public Response Delete(int id)
        {
            var _response = new Response();
            var kontrol = from _context in _context.LinqLocations where _context.Id == id select _context;
            if (kontrol != null)
            {
                _context.LinqLocations.RemoveRange(kontrol);
                _context.SaveChanges();
                _response.Result = "silindi";
            }
            else
            {
                _response.Result = "bulunamadý";
            }
                return _response;

        }


        [HttpPost]
        public Response Add(Location _location)
        {
           // Thread.CurrentThread.CurrentUICulture = new CultureInfo("tr");
            var _response=new Response();
            if (_location.Name.Length == 0 || _location.X == 0 || _location.Y == 0)
            {
                _response.Result = "Boþ deðer girilemez.";
            }
            else
            {
                var eklenen = (from _context in _context.LinqLocations where _context.Name.ToUpper() == _location.Name.ToUpper() select _context).FirstOrDefault();
               // var eklenen = (from _context in _context.LinqLocations where _context.Name.ToUpper(new CultureInfo("tr-TR",false))==_location.Name.ToUpper(new CultureInfo("tr-TR",false)) select _context).FirstOrDefault();
                

                if (eklenen == null)
                {
                 //   _location.Name = eklenen.Name.ToUpper(new CultureInfo("tr-TR", false));
                    _context.LinqLocations.Add(_location);
                    _context.SaveChanges();
                    _response.Result = "Eklendi.";
                }
                else
                {
                    _response.Result = "Ayný deðer eklenemez";
                }
            }
            return _response;
        }


        [HttpPut]
        public Response Update(Location _location, int id)
        {
            var _response = new Response();
            var eklenen = (from _context in _context.LinqLocations where _context.Name == _location.Name select _context).FirstOrDefault();
            var arama = _context.LinqLocations.FirstOrDefault(x => x.Id == id);

           // Location arama=_context.LinqLocations.Single(x=>x.Id==_location.Id);


            if (arama != null)
            {
                if (_location.Name!="string" && eklenen==null)
                {
                    arama.Name = _location.Name;
                }
                if (_location.Name != null)
                {
                    arama.Name = _location.Name;
                }
                if (_location.X != 0)
                {
                    arama.X = _location.X;
                }
                if(_location.Y != 0)
                {
                    arama.Y = _location.Y;
                }
                _context.SaveChanges();
                _response.Result = "kayýt güncellendi";
            }
            else
            {
                _response.Result = "böyle bir kayýt yok";
            }
            return _response;
        }
    }

   

   
}