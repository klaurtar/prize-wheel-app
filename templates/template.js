const prizeWheelTemplate = `
<h2>Land on <span style="color: <%= color %>"><% color %></span></h2>
<h3 id="time-display"></h3>

<div style="position: relative">
    <div id="pointer"></div>
    <div class="prize-wheel">
        <div class="red"></div>
        <div class="blue"></div>
        <div class="green"></div>
        <div class="yellow"></div>
    </div>
</div>

<button class="spinButton">Spin</button>
<% if(spinning){ %>
    <button class="stopButton">Stop</button>
<% } %> `;

const dialogTemplate = `
    <div class="dialog">
        <div class="overlay"></div>
        <div class="p-2 dialog-box">
            <div class="close-icon"><span class="x-icon">X</span></div>
            <div class="head"></div>
            <div class="body"></div>
            <hr>
            <div id="button-container" class="d-flex justify-content-end mt-3">
                <button class="done-button btn btn-primary"></button>
                <button class="cancel-button btn btn-danger ml-3">Cancel</button>
            </div>
        </div>
    </div> 
`;
