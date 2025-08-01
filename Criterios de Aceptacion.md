## 1. Registro de Nuevo Profesor

DADO que el Administrador Académico se encuentra en la sección de gestión de profesores
CUANDO completa los campos requeridos (nombre completo, DNI, legajo, título académico, correo electrónico, teléfono y disponibilidad horaria) y confirma el registro
ENTONCES el sistema crea un nuevo registro de profesor, lo guarda en la base de datos y muestra un mensaje de confirmación exitoso.

## 2. Modificación de Información de Profesor

DADO que el Administrador Académico accede a los datos de un profesor existente
CUANDO modifica uno o más campos de información y guarda los cambios
ENTONCES el sistema actualiza los datos en la base de datos y muestra una confirmación de que la modificación fue exitosa.

## 3. Consulta de Datos de Profesor

DADO que el Administrador Académico desea consultar información de un profesor
CUANDO utiliza los filtros de búsqueda por nombre, DNI o legajo
ENTONCES el sistema muestra la información correspondiente al profesor solicitado.

## 4. Archivar de Profesor

DADO que el Administrador Académico ha seleccionado a un profesor para archivarlo
Y el profesor no está actualmente asignado a ninguna asignatura
CUANDO se presenta un mensaje claro y prominente advirtiendo sobre la acción destructiva (por ejemplo, "Está a punto de eliminar al profesor [Nombre del Profesor]. Esta acción no se puede deshacer. ¿Desea continuar?") y el Administrador confirma
ENTONCES el sistema elimina el registro del profesor de la base de datos y muestra un mensaje de confirmación de eliminación exitosa.

5. Asignación de Profesor a Asignaturas

DADO que el Administrador Académico ha seleccionado uno o más profesores
CUANDO elige una o más asignaturas, especifica el rol (titular, adjunto, ayudante, etc.) y confirma la acción
ENTONCES el sistema asocia a los profesores seleccionados con las asignaturas elegidas, actualiza los registros y muestra una confirmación exitosa.

6. Validación de Disponibilidad Horaria

DADO que el Administrador Académico intenta asignar un profesor a una asignatura en una franja horaria
CUANDO dicha franja se superpone con otra ya asignada al mismo profesor
ENTONCES el sistema bloquea la acción y muestra un mensaje de error indicando que la disponibilidad horaria se solapa.

7. Confirmación de Asignación y Desvinculación

DADO que un profesor ha sido asignado previamente a una asignatura
CUANDO el Administrador Académico desea eliminar esa asignación y confirma la acción
ENTONCES el sistema elimina la relación entre el profesor y la asignatura, actualiza los registros y muestra una confirmación de que la desvinculación fue exitosa.

8. Restricción de Acceso

DADO que un usuario intenta acceder a funcionalidades de gestión de profesores
CUANDO su rol no es el de Administrador Académico
ENTONCES el sistema restringe el acceso, redirige al usuario o muestra un mensaje indicando que no tiene permisos suficientes.

9. Validación de Datos Ingresados

DADO que el Administrador Académico está ingresando o modificando los datos de un profesor
CUANDO alguno de los campos contiene errores (como un correo no válido, teléfono incorrecto o campos vacíos obligatorios)
ENTONCES el sistema muestra mensajes de error específicos, evitando guardar los datos hasta que sean corregidos.