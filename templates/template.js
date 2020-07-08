const prizeWheelTemplate = `
<h2>Land on <span style="color: <%= colorToWin %>"><%= colorToWin %></span></h2>
<h3 id="time-display"></h3>

<div style="position: relative">
    <div id="pointer"></div>
    <div class="prize-wheel" data-spinning="false">
        <% colors.forEach(color => { %>
            <div style="background-color: <%= color %>"></div>
        <% }) %>
    </div>
</div>

<button class="spinButton">Spin</button>
<button class="stopButton" data-active="false">Stop</button>
<button class="new-game-button" data-active="true">New Colors</button>`;

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
