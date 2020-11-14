using System.Data;
using System.Data.SqlClient;
using Entidades;

namespace Datos
{
    public class DatosContinentes
    {
        private static DataTable DT = new DataTable();

        public static DataTable ObtenerContinentes()
        {
            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPObtenerContinentes");

            return Conexion.EjecutarComandoSelect(Comando);
        }

    }
}
