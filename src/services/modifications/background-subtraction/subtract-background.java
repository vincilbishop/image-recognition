// --headless --console -macro ./RunBatch.ijm 'folder=../folder1 parameters=a.properties output=../samples/Output'
arg = getArgument()
print("Running batch analysis with arguments:")
print(arg)
run("Batch process", arg )
print("Done.")
eval("script", "System.exit(0);");