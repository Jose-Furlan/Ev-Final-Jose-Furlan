using System.Data;
using System.Data.SqlClient;
using Entidades;

namespace Datos
{
    public class DatosPaises
    {
        private static DataTable DT = new DataTable();

        public static DataTable AgregarPais(EntidadPaises Entidad)
        {
            DT.Clear();

            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPAgregarPais");
            Comando.Parameters.AddWithValue("@_IdContinente", Entidad.IdContinente);
            Comando.Parameters.AddWithValue("@_TxtPais", Entidad.TxtPais);
            Comando.Parameters.AddWithValue("@_TxtCapital", Entidad.TxtCapital);
            Comando.Parameters.AddWithValue("@_IntAnioIndependencia", Entidad.IntAnioIndependencia);
            Comando.Parameters.AddWithValue("@_IntPoblacion", Entidad.IntPoblacion);
            Comando.Parameters.AddWithValue("@_TxtPresidenteActual", Entidad.TxtPresidenteActual);
            Comando.Parameters.AddWithValue("@_TxtIdiomaOficial", Entidad.TxtIdiomaOficial);
            Comando.Parameters.AddWithValue("@_TxtMoneda", Entidad.TxtMoneda);


            return Conexion.EjecutarComandoSelect(Comando);
        }

        public static DataTable ObtenerPaises(EntidadPaises Entidad)
        {
            DT.Clear();

            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPObtenerPaises");
            Comando.Parameters.AddWithValue("@_IdContinente", Entidad.IdContinente);

            return Conexion.EjecutarComandoSelect(Comando);
        }

        public static DataTable ObtenerDatosPais(EntidadPaises Entidad)
        {
            DT.Clear();

            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPObtenerDatosPais");
            Comando.Parameters.AddWithValue("@_IdRegistro", Entidad.IdPais);

            return Conexion.EjecutarComandoSelect(Comando);
        }

        public static DataTable EliminarPais(EntidadPaises Entidad)
        {
            DT.Clear();

            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPEliminarPais");
            Comando.Parameters.AddWithValue("@_IdRegistro", Entidad.IdPais);

            return Conexion.EjecutarComandoSelect(Comando);

        }

        public static DataTable ActualizarPais(EntidadPaises Entidad)
        {
            DT.Clear();

            SqlCommand Comando = Conexion.CrearComandoProc("Sistema.SPActualizarPais");
            Comando.Parameters.AddWithValue("@_IdRegistro", Entidad.IdPais);
            Comando.Parameters.AddWithValue("@_IdContinente", Entidad.IdContinente);
            Comando.Parameters.AddWithValue("@_TxtPais", Entidad.TxtPais);
            Comando.Parameters.AddWithValue("@_TxtCapital", Entidad.TxtCapital);
            Comando.Parameters.AddWithValue("@_IntAnioIndependencia", Entidad.IntAnioIndependencia);
            Comando.Parameters.AddWithValue("@_IntPoblacion", Entidad.IntPoblacion);
            Comando.Parameters.AddWithValue("@_TxtPresidenteActual", Entidad.TxtPresidenteActual);
            Comando.Parameters.AddWithValue("@_TxtIdiomaOficial", Entidad.TxtIdiomaOficial);
            Comando.Parameters.AddWithValue("@_TxtMoneda", Entidad.TxtMoneda);


            return Conexion.EjecutarComandoSelect(Comando);

        }
    }
}
