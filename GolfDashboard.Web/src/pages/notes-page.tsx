import * as React from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import '../css/pages/notes-page.css';

export class NotesPage extends React.Component {

    render() {
        return (
            <div className="notes-main-content h-100">
                <RichTextEditorComponent>
                    <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                </RichTextEditorComponent>
            </div>
        );
    }
}
