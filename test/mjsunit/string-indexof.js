// Copyright 2008 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

var s = "test test test";

assertEquals(0, s.indexOf("t"));
assertEquals(3, s.indexOf("t", 1));
assertEquals(5, s.indexOf("t", 4));
assertEquals(1, s.indexOf("e"));
assertEquals(2, s.indexOf("s"));

assertEquals(5, s.indexOf("test", 4));
assertEquals(5, s.indexOf("test", 5));
assertEquals(10, s.indexOf("test", 6));
assertEquals(0, s.indexOf("test", 0));
assertEquals(0, s.indexOf("test", -1));
assertEquals(0, s.indexOf("test"));
assertEquals(-1, s.indexOf("notpresent"));
assertEquals(-1, s.indexOf());

for (var i = 0; i < s.length+10; i++) {
  var expected = i < s.length ? i : s.length;
  assertEquals(expected, s.indexOf("", i));
}

var reString = "asdf[a-z]+(asdf)?";

assertEquals(4, reString.indexOf("[a-z]+"));
assertEquals(10, reString.indexOf("(asdf)?"));

assertEquals(1, String.prototype.indexOf.length);

// Random greek letters
var twoByteString = "\u039a\u0391\u03a3\u03a3\u0395";

// Test single char pattern
assertEquals(0, twoByteString.indexOf("\u039a"), "Lamda");
assertEquals(1, twoByteString.indexOf("\u0391"), "Alpha");
assertEquals(2, twoByteString.indexOf("\u03a3"), "First Sigma");
assertEquals(3, twoByteString.indexOf("\u03a3",3), "Second Sigma");
assertEquals(4, twoByteString.indexOf("\u0395"), "Epsilon");
assertEquals(-1, twoByteString.indexOf("\u0392"), "Not beta");  

// Test multi-char pattern
assertEquals(0, twoByteString.indexOf("\u039a\u0391"), "lambda Alpha");
assertEquals(1, twoByteString.indexOf("\u0391\u03a3"), "Alpha Sigma");
assertEquals(2, twoByteString.indexOf("\u03a3\u03a3"), "Sigma Sigma");
assertEquals(3, twoByteString.indexOf("\u03a3\u0395"), "Sigma Epsilon");

assertEquals(-1, twoByteString.indexOf("\u0391\u03a3\u0395"), 
    "Not Alpha Sigma Epsilon");

//single char pattern
assertEquals(4, twoByteString.indexOf("\u0395"));

// Test complex string indexOf algorithms. Only trigger for long strings.

// Long string that isn't a simple repeat of a shorter string.
var long = "A";
for(var i = 66; i < 76; i++) {  // from 'B' to 'K'
  long =  long + String.fromCharCode(i) + long;
}

// pattern of 15 chars, repeated every 16 chars in long
var pattern = "ABACABADABACABA";
for(var i = 0; i < long.length - pattern.length; i+= 7) {
  var index = long.indexOf(pattern, i);
  assertEquals((i + 15) & ~0xf, index, "Long ABACABA...-string at index " + i);
}
assertEquals(510, long.indexOf("AJABACA"), "Long AJABACA, First J");
assertEquals(1534, long.indexOf("AJABACA", 511), "Long AJABACA, Second J");

pattern = "JABACABADABACABA";
assertEquals(511, long.indexOf(pattern), "Long JABACABA..., First J");
assertEquals(1535, long.indexOf(pattern, 512), "Long JABACABA..., Second J");


var lipsum = "lorem ipsum per se esse fugiendum. itaque aiunt hanc quasi "
    + "naturalem atque insitam in animis nostris inesse notionem, ut "
    + "alterum esse appetendum, alterum aspernandum sentiamus. Alii autem,"
    + " quibus ego assentior, cum a philosophis compluribus permulta "
    + "dicantur, cur nec voluptas in bonis sit numeranda nec in malis "
    + "dolor, non existimant oportere nimium nos causae confidere, sed et"
    + " argumentandum et accurate disserendum et rationibus conquisitis de"
    + " voluptate et dolore disputandum putant.\n"
    + "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem "
    + "accusantium doloremque laudantium, totam rem aperiam eaque ipsa,"
    + "quae ab illo inventore veritatis et quasi architecto beatae vitae "
    + "dicta sunt, explicabo. nemo enim ipsam voluptatem, quia voluptas"
    + "sit, aspernatur aut odit aut fugit, sed quia consequuntur magni"
    + " dolores eos, qui ratione voluptatem sequi nesciunt, neque porro"
    + " quisquam est, qui dolorem ipsum, quia dolor sit, amet, "
    + "consectetur, adipisci velit, sed quia non numquam eius modi"
    + " tempora incidunt, ut labore et dolore magnam aliquam quaerat "
    + "voluptatem. ut enim ad minima veniam, quis nostrum exercitationem "
    + "ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi "
    + "consequatur? quis autem vel eum iure reprehenderit, qui in ea "
    + "voluptate velit esse, quam nihil molestiae consequatur, vel illum, "
    + "qui dolorem eum fugiat, quo voluptas nulla pariatur?\n"
    + "At vero eos et accusamus et iusto odio dignissimos ducimus, qui "
    + "blanditiis praesentium voluptatum deleniti atque corrupti, quos "
    + "dolores et quas molestias excepturi sint, obcaecati cupiditate "
    + "non provident, similique sunt in culpa, qui officia deserunt "
    + "mollitia animi, id est laborum et dolorum fuga. et harum quidem "
    + "rerum facilis est et expedita distinctio. nam libero tempore, "
    + "cum soluta nobis est eligendi optio, cumque nihil impedit, quo "
    + "minus id, quod maxime placeat, facere possimus, omnis voluptas "
    + "assumenda est, omnis dolor repellendus. temporibus autem "
    + "quibusdam et aut officiis debitis aut rerum necessitatibus "
    + "saepe eveniet, ut et voluptates repudiandae sint et molestiae "
    + "non recusandae. itaque earum rerum hic tenetur a sapiente "
    + "delectus, ut aut reiciendis voluptatibus maiores alias consequatur "
    + "aut perferendis doloribus asperiores repellat.";

assertEquals(893, lipsum.indexOf("lorem ipsum, quia dolor sit, amet"),
        "Lipsum");
// test a lot of substrings of differing length and start-position.
for(var i = 255; i < lipsum.length; i += 3) {
  for(var len = 661; i + len < lipsum.length; len += 4) {
    var substring = lipsum.substring(i, i + len);
    var index = -1;
    do {
      index = lipsum.indexOf(substring, index + 1);
      assertTrue(index != -1, 
                 "Lipsum substring " + i + ".." + (i + len-1) + " not found");
      assertEquals(lipsum.substring(index, index + len), substring, 
          "Wrong lipsum substring found: " + i + ".." + (i + len - 1) + "/" + 
              index + ".." + (index + len - 1));
    } while (index >= 0 && index < i);
    assertEquals(i, index, "Lipsum match at " + i + ".." + (i + len - 1));
  }
}
