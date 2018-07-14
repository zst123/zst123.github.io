#!/usr/bin/env python3
import glob

def use_template(content, id):
    with open('../index.html') as f:
        template = f.read()

        template_start = template.split('<!-- CONTENT START -->', 1)[0]
        template_end = template.split('<!-- CONTENT END -->', 1)[1]


        content = (f'\n<!-- {id} START -->\n' + 
                    content + 
                    f'\n<!-- {id} END -->\n')

    return template_start + content + template_end

if __name__ == '__main__':
    path = "./*.page.html"
    for filename in glob.glob(path):
        print('Generating: ' + filename)
        with open(filename, 'r') as f:
            x = use_template(f.read(), f.name)
            generated_filename = '../' + filename.replace('.page', '')
            with open(generated_filename, 'w') as f1:
                f1.write(x)

    