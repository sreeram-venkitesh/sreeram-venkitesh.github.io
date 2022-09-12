export default function (plop) {
  // controller generator

  plop.setGenerator('Normal blog post', {
      description: 'Template for new blog post',
      prompts: [
        {
          type: 'input',
          name: 'title',
          message: 'Enter title for your blog post'
        },
        {
          type: 'input',
          name: 'summary',
          message: 'Enter the summary for your blog post'
        },
        {
          type: 'input',
          name: 'tags',
          message: 'Enter tags for your blog post'
        },
    ],
      actions: [{
          type: 'add',
          path: 'data/blog/{{title}}.md',
          templateFile: 'templates/blog.hbs'
      }]
  });

  plop.setGenerator('What you read post', {
    description: 'Template for what you read this month',
    prompts: [{
        type: 'confirm',
        name: 'test',
        message: 'Creating what you read post'
    }],
    actions: [{
        type: 'add',
        path: 'data/blog/reads/{{readmonth}}.md',
        templateFile: 'templates/read.hbs'
    }]
  });

  plop.setHelper("date", () => {
    return new Date().toISOString().substring(0, 10).toString()
  });

  plop.setHelper("readmonth", () => {
    let date = new Date()
    let {month, year} = new Intl.DateTimeFormat('en', {
        month: 'long',
        year: 'numeric'
      }).formatToParts(date).reduce((acc, part) => {
        if (part.type != 'literal') {
          acc[part.type] = part.value;
        }
        return acc;
      }, Object.create(null));
    return `${month.toLowerCase()}-${year}`;
  });

  plop.setHelper("monthyear", () => {
    let date = new Date()
    let {month, year} = new Intl.DateTimeFormat('en', {
        month: 'long',
        year: 'numeric'
      }).formatToParts(date).reduce((acc, part) => {
        if (part.type != 'literal') {
          acc[part.type] = part.value;
        }
        return acc;
      }, Object.create(null));
    return `${month} ${year}`;
  });

  plop.setHelper("tagArray", (tags) => {
    console.log("putting tags")
    console.log(tags)
    return tags.split(" ").map(tag => tag).toString();
  })
};