
import csv

# This only works on my computer


def countByteSequences(path):
    byteCounts = {}

    stopAfterSequences = 1024*1024  # 1MB*3
    byteSequenceSize = 2

    with open(path, "rb") as file:
        seq = file.read(byteSequenceSize)
        count = 1

        # iterate through file byte-by-byte
        while seq != b"" and count <= stopAfterSequences:
            if seq in byteCounts:
                byteCounts[seq] += 1
            else:
                byteCounts[seq] = 1

            seq = file.read(byteSequenceSize)
            count += 1

    return byteCounts


def writeCSV(byteCounts):
    with open('./dataset.csv', mode='w') as csv_file:
        fieldnames = ["byte", "count"]
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()

        for byte in byteCounts:
            writer.writerow({'byte': byte.hex(), 'count': byteCounts[byte]})


path = "/Volumes/Big Datasets/Sherwood/October 2019/CN-DC1.7z"
writeCSV(countByteSequences(path))

# data = countBytes(path)
# count = 0
# for k, v in data.items():
#     count += v
# print(count)
