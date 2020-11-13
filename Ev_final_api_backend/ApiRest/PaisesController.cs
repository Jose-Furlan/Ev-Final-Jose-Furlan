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
        [Route("api/ObtenerEmpleados")]
        public DataTable ObtenerEmpleados(EntidadPaises Entidad)
        {
            return DatosPaises.ObtenerPaises(Entidad);
        }

        [HttpPost]
        [Route("api/ObtenerDatosEmpleado")]
        public DataTable ObtenerDatosEmpleado(EntidadPaises entidad)
        {
            return DatosPaises.ObtenerDatosPais(entidad);
        }

        [HttpPost]
        [Route("api/EliminarEmpleado")]
        public DataTable EliminarEmpleado(EntidadPaises entidad)
        {
            return DatosPaises.EliminarPais(entidad);
        }

        [HttpPost]
        [Route("api/ActualizarEmpleado")]
        public DataTable ActualizarEmpleado(EntidadPaises entidad)
        {
            return DatosPaises.ActualizarPais(entidad);
        }
    }
}