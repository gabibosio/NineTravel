const URL_API_BASE = "http://127.0.0.1:8000/reserva/";

class Reserva {
    constructor({ fecha_ingreso, fecha_salida, id, cant_personas }) {
        this.fecha_ingreso = fecha_ingreso;
        this.fecha_salida = fecha_salida;
        this.cant_personas = cant_personas;
        this.id = id;
        this.url = "http://127.0.0.1:8000/reserva/";
    }

    createDiv() {
        this.div = document.createElement("div");

        this.div.innerHTML = `
            <div id="${this.id}">
                <h4>Reserva ${this.id}</h4>
                <hr>
                <ul>
                    <li>Fecha de Ingreso: ${this.fecha_ingreso}</li>
                    <li>Fecha de Salida: ${this.fecha_salida}</li>
                    <li>Cantidad de Personas: ${this.cant_personas}</li>
                </ul>
            </div>
        `;

        let btn = document.createElement("button");
        btn.innerText = `Cancelar Reserva`;
        btn.addEventListener("click", () => {
            fetch(`${this.url}${this.id}/`, { method: "DELETE" })
                .then(() => this.removeDiv())
                .catch(error => console.log({ error }));
        });
        this.div.appendChild(btn);

        let btn1 = document.createElement("button");
        btn1.innerText = `Modificar Reserva`;
        this.div.appendChild(btn1);

        const form = document.createElement('form');
        form.style.display = 'none';

        const ingresoLabel = document.createElement('label');
        ingresoLabel.innerText = 'Fecha de Ingreso:';
        form.appendChild(ingresoLabel);

        const ingresoInput = document.createElement('input');
        ingresoInput.type = 'date';
        ingresoInput.name = 'fecha_ingreso';
        ingresoInput.id = `ingreso_${this.id}`;
        form.appendChild(ingresoInput);

        const salidaLabel = document.createElement('label');
        salidaLabel.innerText = 'Fecha de Salida:';
        form.appendChild(salidaLabel);

        const salidaInput = document.createElement('input');
        salidaInput.type = 'date';
        salidaInput.name = 'fecha_salida';
        salidaInput.id = `salida_${this.id}`;
        form.appendChild(salidaInput);

        const personasLabel = document.createElement('label');
        personasLabel.innerText = 'Cantidad de Personas:';
        form.appendChild(personasLabel);

        const personasInput = document.createElement('input');
        personasInput.type = 'number';
        personasInput.name = 'cant_personas';
        personasInput.id = `personas_${this.id}`;
        form.appendChild(personasInput);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerText = 'Confirmar';
        form.appendChild(submitButton);

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.innerText = 'Cancelar';
        form.appendChild(cancelButton);

        submitButton.addEventListener("click", (event) => {
            event.preventDefault();
            let fechaIngreso = document.querySelector(`#ingreso_${this.id}`).value;
            let fechaSalida = document.querySelector(`#salida_${this.id}`).value;
            let personas = parseInt(document.querySelector(`#personas_${this.id}`).value);

            const url = `${this.url}${this.id}/`;
            const data = {
                "fecha_ingreso": fechaIngreso,
                "fecha_salida": fechaSalida,
                "cant_personas": personas
            };

            fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(updatedData => {
                this.fecha_ingreso = updatedData.fecha_ingreso;
                this.fecha_salida = updatedData.fecha_salida;
                this.cant_personas = updatedData.cant_personas;
                this.updateDiv();
            })
            .then(()=>{
                this.limpiarForm()
                form.style.display = 'none'
            })
            .catch(error => {
                console.log('Error:', error);
            });
        });

        this.div.appendChild(form);

        btn1.addEventListener('click', function() {
            form.style.display = 'block';
        });

        cancelButton.addEventListener("click", (event) => {
            form.style.display = 'none'
        })

        return this.div;
    }

    updateDiv() {
        const reservaDiv = document.getElementById(this.id);
        reservaDiv.querySelector('ul').innerHTML = `
            <li>Fecha de Ingreso: ${this.fecha_ingreso}</li>
            <li>Fecha de Salida: ${this.fecha_salida}</li>
            <li>Cantidad de Personas: ${this.cant_personas}</li>
        `;
    }

    removeDiv() {
        this.div.remove();
    }

    limpiarForm(){
        document.querySelector(`#ingreso_${this.id}`).value = ""
        document.querySelector(`#salida_${this.id}`).value = ""
        document.querySelector(`#personas_${this.id}`).value = ""
    }
}

const btnGet = document.getElementById("btn-get");
btnGet.addEventListener("click", () => {
    fetch(URL_API_BASE)
        .then(res => res.json())
        .then(data => {
            let container = document.querySelector("#reservas");
            container.innerHTML = '';
            data.map(r => new Reserva(r))
                .forEach(r => container.appendChild(r.createDiv()));
        })
        .catch(error => console.log({ error }));
});


