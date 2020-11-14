----------------------- SQLQUERY EVALUACION FINAL--------------------------
CREATE SCHEMA Sistema

ALTER SCHEMA Sistema TRANSFER dbo.TblContinentes
ALTER SCHEMA Sistema TRANSFER dbo.TblPaises

----------------------------------------- CONTINENTES -----------------------------------------------------
/*
	Author: José Furlán
	Fecha: 12/11/2020
*/

CREATE PROC Sistema.SPObtenerContinentes
AS
BEGIN
	SELECT	a.IdContinente,
			a.TxtContinente,
			a.FechaDeIngreso,
			a.IntEstado

	FROM Sistema.TblContinentes AS a
	WHERE a.IntEstado > 0
END --FIN

----------------------------------------- PAISES -----------------------------------------------------
/*
	Author: José Furlán
	Fecha: 12/11/2020
*/

CREATE PROC Sistema.SPAgregarPais	(
											@_IdContinente		TINYINT,
											@_TxtPais			NVARCHAR(100),
											@_TxtCapital		NVARCHAR(100),
											@_IntAnioIndependencia SMALLINT,
											@_IntPoblacion		INT,
											@_TxtPresidenteActual NVARCHAR(100),
											@_TxtIdiomaOficial	NVARCHAR(50),
											@_TxtMoneda			NVARCHAR(50)
									)	
AS
DECLARE @_FilasAfectadas		TINYINT
		,@_Resultado			SMALLINT
		,@_UltimoId				SMALLINT
BEGIN
BEGIN TRAN
--Se obtiene el ultimo resultado de la tabla

	SELECT	@_UltimoId			=	ISNULL(MAX(a.IdPais),0)
	FROM	Sistema.TblPaises	AS	a
	
	BEGIN TRY
		INSERT INTO Sistema.TblPaises	(
											IdPais
											,IdContinente
											,TxtPais
											,TxtCapital
											,IntAnioIndependencia
											,IntPoblacion
											,TxtPresidenteActual
											,TxtIdiomaOficial
											,TxtMoneda
										)
		VALUES							(
											@_UltimoId + 1
											,@_IdContinente
											,@_TxtPais
											,@_TxtCapital
											,@_IntAnioIndependencia
											,@_IntPoblacion
											,@_TxtPresidenteActual
											,@_TxtIdiomaOficial
											,@_TxtMoneda
										)
		SET @_FilasAfectadas			=	@@ROWCOUNT
	END TRY
	BEGIN CATCH
		SET @_FilasAfectadas			=	0
	END CATCH		

--DETERMINAR SI SE REALIZO CORRECTAMENTE LA TRANSACCION ANTERIOR
IF (@_FilasAfectadas > 0)
		BEGIN
			SET @_Resultado			=	@_UltimoId + 1
			COMMIT
		END
	ELSE
		BEGIN
			SET @_Resultado			=	0
			ROLLBACK
		END
	--DEVOLVER RESULTADO: EL ULTIMO ID QUE UTILIZARÉ MÁS ADELANTE
	SELECT Resultado				=	@_Resultado
END --FIN 

/*
	Author: José Furlán
	Fecha: 12/11/2020
*/

CREATE PROC Sistema.SPObtenerPaises(
			@_IdContinente TINYINT
)
AS
BEGIN
	SELECT	a.IdPais,
			a.TxtPais,
			a.IdContinente,
			b.TxtContinente,
			a.TxtCapital,
			a.IntAnioIndependencia,
			a.IntPoblacion,
			a.TxtPresidenteActual,
			a.TxtIdiomaOficial,
			a.TxtMoneda,
			a.FechaDeIngreso,
			a.IntEstado

	FROM Sistema.TblPaises AS a
	LEFT JOIN Sistema.TblContinentes AS b
	ON	a.IdContinente = b.IdContinente
	WHERE a.IntEstado > 0 and a.IdContinente = @_IdContinente
END --FIN



/*
	Author: José Furlán
	Fecha: 12/11/2020
*/

CREATE PROC Sistema.SPObtenerDatosPaises(
	@_IdRegistro INT
)

AS
BEGIN
	SELECT	a.IdPais,
			a.TxtPais,
			a.IdContinente,
			a.TxtCapital,
			a.IntAnioIndependencia,
			a.IntPoblacion,
			a.TxtPresidenteActual,
			a.TxtIdiomaOficial,
			a.TxtMoneda

	FROM	Sistema.TblPaises AS a
	WHERE	a.IdPais = @_IdRegistro
END

/*
	Author: José Furlán
	Fecha: 12/11/2020
*/

CREATE PROC Sistema.SPEliminarPais (
	@_IdRegistro INT
)
AS
DECLARE 
	@_FilasAfectadas	TINYINT,
	@_Resultado			INT

BEGIN
	BEGIN TRAN
		BEGIN TRY
			UPDATE	Sistema.TblPaises
			SET		IntEstado = 0
					
			WHERE	IdPais = @_IdRegistro

			SET		@_FilasAfectadas = @@ROWCOUNT
		END TRY
		BEGIN CATCH
			SET		@_FilasAfectadas = 0
		END CATCH

		IF(@_FilasAfectadas > 0)
			BEGIN
				SET @_Resultado = @_IdRegistro
				COMMIT
			END
		ELSE
			BEGIN
				SET @_Resultado = 0
			ROLLBACK
		END
	SELECT Resultado  = @_Resultado
END

/*
	Author: José Furlán
	Fecha: 12/11/2020
*/

CREATE PROC Sistema.SPActualizarPais (
	@_IdRegistro INT,
	@_IdContinente		TINYINT,
	@_TxtPais			NVARCHAR(100),
	@_TxtCapital		NVARCHAR(100),
	@_IntAnioIndependencia SMALLINT,
	@_IntPoblacion		INT,
	@_TxtPresidenteActual NVARCHAR(100),
	@_TxtIdiomaOficial	NVARCHAR(50),
	@_TxtMoneda			NVARCHAR(50)
)

AS
DECLARE 
	@_FilasAfectadas	TINYINT,
	@_Resultado			INT

BEGIN
	BEGIN TRAN
		BEGIN TRY
			UPDATE	Sistema.TblPaises
			SET		IdContinente = @_IdContinente,
					TxtPais = @_TxtPais,
					TxtCapital = @_TxtCapital,
					IntAnioIndependencia = @_IntAnioIndependencia,
					IntPoblacion = @_IntPoblacion,
					TxtPresidenteActual = @_TxtPresidenteActual,
					TxtIdiomaOficial = @_TxtIdiomaOficial,
					TxtMoneda = @_TxtMoneda
					
			WHERE	IdPais = @_IdRegistro

			SET		@_FilasAfectadas = @@ROWCOUNT
		END TRY
		BEGIN CATCH
			SET		@_FilasAfectadas = 0
		END CATCH

		IF(@_FilasAfectadas > 0)
			BEGIN
				SET @_Resultado = @_IdRegistro
				COMMIT
			END
		ELSE
			BEGIN
				SET @_Resultado = 0
			ROLLBACK
		END

	SELECT Resultado  = @_Resultado
END