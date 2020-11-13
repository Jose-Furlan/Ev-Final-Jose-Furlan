using System.Data;
using System.Web.Http;
using Datos;
using Entidades;

namespace ApiRest
{
    public class ContinentesController: ApiController
    {
        [HttpPost]
        [Route("api/ObtenerContinentes")]
        public DataTable AgregarEmpleado(EntidadContinentes entidad)
        {
            return DatosContinentes.ObtenerContinentes(entidad);
        }
    }
}