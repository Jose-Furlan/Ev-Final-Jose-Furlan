using System.Data;
using System.Data.SqlClient;
using Entidades;

namespace Datos
{
    public class DatosContinentes
    {
        private static DataTable DT = new DataTable();

        public static DataTable AgregarContinente(EntidadContinentes Entidad)
        {
            DT.Clear();

            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPAgregarContinente");
            Comando.Parameters.AddWithValue("@_TxtContinente", Entidad.TxtContinente);            

            return Conexion.EjecutarComandoSelect(Comando);
        }

        public static DataTable ObtenerContinentes(EntidadContinentes Entidad)
        {
            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPObtenerContinentes");

            return Conexion.EjecutarComandoSelect(Comando);
        }

        public static DataTable ObtenerDatosContinente(EntidadContinentes Entidad)
        {
            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPObtenerDatosContinente");
            Comando.Parameters.AddWithValue("@_IdRegistro", Entidad.IdContinente);

            return Conexion.EjecutarComandoSelect(Comando);
        }

        public static DataTable EliminarContinente(EntidadContinentes Entidad)
        {
            
                SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPEliminarContinente");
                Comando.Parameters.AddWithValue("@_IdRegistro", Entidad.IdContinente);

                return Conexion.EjecutarComandoSelect(Comando);

        }

        public static DataTable ActualizarContinente(EntidadContinentes Entidad)
        {
            
                SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPActualizarContinente");
                Comando.Parameters.AddWithValue("@_IdRegistro", Entidad.IdContinente);
                Comando.Parameters.AddWithValue("@_TxtContinente", Entidad.TxtContinente);

                return Conexion.EjecutarComandoSelect(Comando);
         
        }

    }
}
