#!/bin/bash
# Build dynamic index.html listing all project directories
# Usage: ./build-index.sh

# Generate sitemap/index file
cat > ./index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SYTSW Projects</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
        }
        ul {
            list-style-type: none;
            padding-left: 0;
        }
        li {
            margin: 8px 0;
        }
        .directory::before {
            content: "📁 ";
        }
        .file::before {
            content: "📎 ";
        }
        .site::before {
            content: "🌐 ";
        }
        a {
            text-decoration: none;
            color: #0366d6;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>SYTSW Projects</h1>
    <ul>
EOF

# Function to create index.html for a directory with tasks
create_task_index() {
    local dir="$1"
    local dir_name=$(basename "$dir")
    
    cat > "$dir/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$dir_name Tasks</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
        }
        ul {
            list-style-type: none;
            padding-left: 0;
        }
        li {
            margin: 8px 0;
        }
        .directory::before {
            content: "📁 ";
        }
        a {
            text-decoration: none;
            color: #0366d6;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>$dir_name Tasks</h1>
    <ul>
EOF

    # Find task directories and sort them numerically
    find "$dir" -maxdepth 1 -type d -name "task*" | sort -V | while read task_dir; do
        task_name=$(basename "$task_dir")
        # Convert task1 -> Task 1
        if [[ "$task_name" =~ ^task([0-9]+)$ ]]; then
            task_number="${BASH_REMATCH[1]}"
            display_name="Task $task_number"
        else
            display_name="$task_name"
        fi
        echo "        <li class=\"directory\"><a href=\"./$task_name/\">$display_name</a></li>" >> "$dir/index.html"
    done

    cat >> "$dir/index.html" << EOF
    </ul>
    <p><a href="../">← Back to main</a></p>
    <p><small>Generated on $(date)</small></p>
</body>
</html>
EOF
}

# List all top-level directories
find . -maxdepth 1 -type d | sort | grep -v "^\.$" | while read dir; do
    dir_name=$(basename "$dir")
    
    # Skip hidden directories
    if [[ "$dir_name" == .* ]]; then
        continue
    fi
    
    # Check if directory has an index.html, if not and it has task subdirectories, create one
    if [ ! -f "$dir/index.html" ]; then
        # Check if directory contains task subdirectories
        if find "$dir" -maxdepth 1 -type d -name "task*" | grep -q .; then
            create_task_index "$dir"
            echo "Created index.html for $dir_name"
        fi
    fi
    
    echo "        <li class=\"directory\"><a href=\"./$dir_name/\">$dir_name</a></li>" >> ./index.html
done

# List all top-level files
find . -maxdepth 1 -type f | sort | grep -v "index\.html$" | while read file; do
    file_name=$(basename "$file")
    
    # Skip hidden files and build scripts
    if [[ "$file_name" == .* || "$file_name" == build-* ]]; then
        continue
    fi
    
    echo "        <li class=\"file\"><a href=\"./$file_name\">$file_name</a></li>" >> ./index.html
done

# Close HTML tags
cat >> ./index.html << EOF
    </ul>
    <p><small>Generated on $(date)</small></p>
</body>
</html>
EOF

echo "Sitemap generated."