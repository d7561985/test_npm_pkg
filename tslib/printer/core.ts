import * as mustache from 'mustache';
// import "../global"

const tpl = `
<div class="wrapper">
    <div class="content">
{{#pages}}
    <div class="page {{class}}">
        <div class="title">{{{title}}}</div>
        <div class="page-content-wrapper">
            <div class="page-content">
                {{{content}}}
                {{^content}}
                    {{{.}}}
                {{/content}}
            </div>
        </div>
    </div>
{{/pages}}
        <div class="pays">{{{pays}}}</div>
    </div>
</div>`;

//
export function sayHello(pages: any, pays: any) {
    return mustache.render(tpl, {pages: pages, pays: pays})
}

export function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `${name} -- ${window.GAME.demo}`
}