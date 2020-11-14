using System.Data;
using System.Web.Http;
using Datos;
using Entidades;

namespace ApiRest
{
    public class PaisesController: ApiController
    {
        [HttpPost]
        [Route("api/AgregarPais")]
        public DataTable AgregarPais(EntidadPaises entidad)
        {
            return DatosPaises.AgregarPais(entidad);
        }

        [HttpPost]
        [Route("api/ObtenerPaises")]
        public DataTable ObtenerPaises(EntidadPaises Entidad)
        {
            return DatosPaises.ObtenerPaises(Entidad);
        }

        [HttpPost]
        [Route("api/ObtenerDatosPais")]
        public DataTable ObtenerDatosPais(EntidadPaises entidad)
        {
            return DatosPaises.ObtenerDatosPais(entidad);
        }

        [HttpPost]
        [Route("api/EliminarPais")]
        public DataTable EliminarPais(EntidadPaises entidad)
        {
            return DatosPaises.EliminarPais(entidad);
        }

        [HttpPost]
        [Route("api/ActualizarPais")]
        public DataTable ActualizarPais(EntidadPaises entidad)
        {
            return DatosPaises.ActualizarPais(entidad);
        }
    }
}