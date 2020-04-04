export default (view, property, color, substrate, relation)=>{
    return  new Promise(async (resolve, reject) => {resolve(`
         <div id="player8input" class="player-input">
                    <label for="player8name">
                        <p>Player 8</p>
                        <div class="option">
                            <input type="text" id="player8name" title="Player name" maxlength="16" placeholder="Player 8" />
                            <select id="player8color" title="Player color">
                                <option style="color: aqua;">Aqua</option>
                                <option style="color: black;">Black</option>
                                <option selected="selected" style="color: blue;">Blue</option>
                                <option style="color: fuchsia;">Fuchsia</option>
                                <option style="color: gray;">Gray</option>
                                <option style="color: green;">Green</option>
                                <option style="color: lime;">Lime</option>
                                <option style="color: maroon;">Maroon</option>
                                <option style="color: navy;">Navy</option>
                                <option style="color: olive;">Olive</option>
                                <option style="color: orange;">Orange</option>
                                <option style="color: purple;">Purple</option>
                                <option style="color: red;">Red</option>
                                <option style="color: silver;">Silver</option>
                                <option style="color: teal;">Teal</option>
                                <option style="color: yellow;">Yellow</option>
                            </select>
                            <select id="player8ai" title="Choose whether this player is controled by a human or by the computer." onclick="document.getElementById('player2name').disabled = this.value !== '0';">
                                <option value="0" selected="selected">Human</option>
                                <option value="1">AI (Test)</option>
                            </select>
                        </div>
                    </label>
                </div>
      
      
      `)
    })
}